# Wording rules

Stephen is subject to a non-compete. This site describes his **record**; it never makes an **offer**. Every sentence on it, in the content model, the chrome, the schema, `llms.txt` and the emails the form sends, is written to this rule, and `npm run content:check` enforces the mechanical part of it on every build.

The test for any sentence: could a reader, or a lawyer, take it as Laws Safety asking for their business? If yes, rewrite it as history.

## Write

- In the third person, about Stephen, in the past or present perfect. "Stephen has delivered CDM principal-designer duties on live construction sites for over fifteen years."
- What was done, where, in which sector, for how long, under which regulations.
- Sectors and disciplines as his experience: "Sectors Stephen has worked across", "Disciplines Stephen has delivered".
- Page headings as noun phrases about him, never imperatives about the reader.
- Educational content (the guides, the "what it involves" sections) as general guidance on the law and practice, with no claim about Stephen inside it; his record lives in the `delivered` bullets and nowhere else.

## Never write

- "we", "our", "us" as the voice of the site (the privacy notice is written in the third person too).
- Anything from the banned list in `scripts/content-check.mjs`: "we offer", "our services", "services include", "Laws Safety offers", "Laws Safety provides", "hire us", "hire Stephen", "book a", "book Stephen", "get a quote", "free quote", "request a quote", "packages", "pricing", "from £", "available for", "call today", "call now", "let us", "we can help", "how we can help", "contact us to discuss", "discuss your requirements", "no obligation", "competitive rates".
- What is available, what it costs, how to buy it, how quickly it can start, or any guarantee.
- A former employer's name, its clients, or its projects, unless `NAME_EMPLOYERS` in `lib/content/profile.ts` is set to true (Stephen's decision under the non-compete). With it false, every employer and client is described by type through `orgLabel()`: "a Kent health and safety consultancy and training provider", "a national housing contractor". Never write a name into copy directly.
- Superlatives: "leading", "best", "premier", "expert" as a label.
- Any fact about Stephen that did not come from Stephen. Every record line traces to his CV; nothing is inferred, nothing is taken from anyone else's website.

## The three permitted calls to action

1. "Get in touch with Stephen" (the button, the contact band, the contact page)
2. "Email Stephen"
3. "Connect on LinkedIn"

The contact form is headed "Send a message" and its button reads "Send to Stephen". Nothing else invites a reader to do anything.

## Testimonials

Only with the author's written permission. Attributed by role and sector unless the person has agreed to be named. Nothing quoted from a former employer's clients or marketing. The page does not exist until the list has at least one entry.

## Placeholders

A fact awaiting Stephen's record is written as `[[what is needed]]` inside the content model. The build refuses to ship while any remain, so a placeholder can never reach the live site by accident. Fill it or delete the record it sits in; never paraphrase around it.

## Style

British English. Sentence case for headings. No exclamation marks, no emoji. Figures as digits with the unit ("22 years", "40+ sites"). Qualifications in full on first use with the post-nominal after: "Chartered Member of IOSH (CMIOSH)". Regulations by their full title on first use, then the short form.

## Right and wrong

> Wrong: "Laws Safety offers CDM consultancy and site inspections across London and the South East."
>
> Right: "Stephen has provided specialist construction support to clients, designers and principal contractors since 2011, and has inspected live sites across London and the South East with written reports and support through to closeout."

> Wrong: "Need a competent person? Get in touch for a free consultation."
>
> Right: "Stephen has been the competent person for client businesses in construction, civil engineering, retail fit-out and fabrication, keeping them compliant with their statutory duties." followed, at most, by the standard "Get in touch with Stephen" button.
