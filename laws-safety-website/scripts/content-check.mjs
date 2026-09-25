#!/usr/bin/env node
/**
 * content-check.mjs — the wording guardrail.
 *
 * Runs before every build (`npm run build`) and fails it on any of:
 *
 *   1. A placeholder still in the content model. Anything between [[ and ]]
 *      in lib/content is a fact awaiting Stephen's own record, and it must
 *      never render on the live site. Set ALLOW_PLACEHOLDERS=1 for a preview
 *      build while content is still arriving.
 *   2. Offer language anywhere in the app. The site describes Stephen's
 *      record under a non-compete; it never sells. The banned list mirrors
 *      docs/WORDING_RULES.md.
 *   3. Leftovers from the template this site was forked from.
 *   4. A card summary or short title over its SERP budget.
 *
 * Usage: node scripts/content-check.mjs [--quiet]
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const QUIET = process.argv.includes('--quiet');
const ALLOW_PLACEHOLDERS = process.env.ALLOW_PLACEHOLDERS === '1';

/** Phrases the site must never use. Matched case-insensitively, whole words. */
const BANNED = [
  'we offer',
  'our services',
  'services include',
  'laws safety offers',
  'laws safety provides',
  'hire us',
  'hire stephen',
  'book a',
  'book stephen',
  'get a quote',
  'free quote',
  'request a quote',
  'packages',
  'pricing',
  'from £',
  'available for',
  'call today',
  'call now',
  'let us',
  'we can help',
  'how we can help',
  'contact us to discuss',
  'discuss your requirements',
  'no obligation',
  'competitive rates',
];

/** Strings that must not survive the fork. */
const LEFTOVERS = ['andrews-recruitment', 'Andrews Recruitment', 'ARG_', 'Manatal', 'IvyLens', 'RecXchange', 'AMIVY', 'Candidate Cloud', '7225C0', '38B6FF'];

const SCAN_DIRS = ['app', 'components', 'lib'];
const CONTENT_DIR = 'lib/content';
const EXT = /\.(ts|tsx|mjs|css)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      walk(p, out);
    } else if (EXT.test(name)) {
      out.push(p);
    }
  }
  return out;
}

const problems = [];
const add = (level, file, line, issue, detail = '') => problems.push({ level, file: relative(ROOT, file), line, issue, detail });

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const inContent = file.includes(`/${CONTENT_DIR}/`);
  const isCheckerOrRules = file.endsWith('content-check.mjs');

  lines.forEach((ln, i) => {
    const trimmed = ln.trim();
    const isComment = trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*');

    // 1. Placeholders (content model only, and never inside a comment, which
    //    cannot render; the comments explain the convention).
    if (inContent && !isComment) {
      const m = ln.match(/\[\[([^\]]*)\]\]/g);
      if (m) for (const hit of m) add(ALLOW_PLACEHOLDERS ? 'warn' : 'error', file, i + 1, 'placeholder', hit.slice(0, 110));
    }

    // 2. Offer language. Comments explaining the rule are allowed to quote it,
    //    so a line that is clearly a comment or the banned list itself is skipped.
    if (!isComment && !isCheckerOrRules) {
      for (const phrase of BANNED) {
        const re = new RegExp(`(^|[^a-z])${escapeRe(phrase)}([^a-z]|$)`, 'i');
        if (re.test(ln)) add('error', file, i + 1, 'offer language', `"${phrase}"`);
      }
    }

    // 3. Template leftovers.
    for (const s of LEFTOVERS) {
      if (ln.includes(s)) add('error', file, i + 1, 'template leftover', s);
    }
  });
}

// 4. Budgets on the card copy the templates cannot clamp.
const budgetChecks = [
  { file: 'lib/content/disciplines.ts', field: 'seoTitle', max: 46 },
  { file: 'lib/content/sectors.ts', field: 'seoTitle', max: 46 },
  { file: 'lib/content/locations.ts', field: 'seoTitle', max: 46 },
  { file: 'lib/content/insights.ts', field: 'seoTitle', max: 46 },
  { file: 'lib/content/disciplines.ts', field: 'summary', max: 155 },
  { file: 'lib/content/disciplines.ts', field: 'shortTitle', max: 32 },
  { file: 'lib/content/sectors.ts', field: 'summary', max: 155 },
  { file: 'lib/content/sectors.ts', field: 'shortTitle', max: 32 },
  { file: 'lib/content/locations.ts', field: 'summary', max: 155 },
  { file: 'lib/content/insights.ts', field: 'description', max: 155 },
];
for (const { file, field, max } of budgetChecks) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  const re = new RegExp(`${field}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g');
  let m;
  while ((m = re.exec(text))) {
    const value = m[1].replace(/\\'/g, "'").replace(/\\u2019/g, '’');
    if (value.length > max) {
      const line = text.slice(0, m.index).split('\n').length;
      add('warn', join(ROOT, file), line, `${field} over budget`, `${value.length} chars (> ${max}): "${value.slice(0, 60)}…"`);
    }
  }
}

const errors = problems.filter((p) => p.level === 'error');
const warns = problems.filter((p) => p.level === 'warn');

if (!QUIET || errors.length) {
  for (const p of problems) {
    console.log(`${p.level === 'error' ? 'ERROR' : 'warn '}  ${p.file}:${p.line}  ${p.issue}${p.detail ? `  →  ${p.detail}` : ''}`);
  }
}

console.log(`\ncontent-check: ${files.length} files, ${errors.length} error(s), ${warns.length} warning(s)`);
if (errors.length) {
  const placeholders = errors.filter((e) => e.issue === 'placeholder').length;
  if (placeholders) {
    console.log(`\n${placeholders} placeholder(s) remain in lib/content. Fill them from Stephen's record, or set ALLOW_PLACEHOLDERS=1 for a preview build.`);
  }
  process.exit(1);
}
