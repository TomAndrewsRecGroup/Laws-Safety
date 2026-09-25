import type { Location } from './types';
import { ADDRESS_ONE_LINE } from '@/lib/site';

/**
 * The London and South East patch, as location spokes. `localContext` is
 * checkable public geography: what each area is and what kind of workplaces
 * it holds. `projects` is Stephen's own record in that area and ships EMPTY:
 * the page renders nothing for it until he supplies it, and never invents a
 * site, a client or a job.
 *
 * Distances are road miles from Stephen's base at Nepicar Park, Wrotham
 * (M20 junction 2 / M26), rounded.
 */
export const LOCATIONS: Location[] = [
  {
    slug: 'sevenoaks',
    seoTitle: 'Health and safety in Sevenoaks: Stephen Laws',
    name: 'Sevenoaks',
    area: 'Sevenoaks, Wrotham and West Kent',
    region: 'West Kent',
    summary:
      'Stephen’s home patch: Wrotham, Sevenoaks, Borough Green and the M20/M26 corridor, with its residential developments, business parks and rural estates.',
    localContext: [
      'Stephen is based at Nepicar Park in Wrotham, where the M20, M26 and A20 meet a few miles east of Sevenoaks. It is the western gateway to the county: London-bound commuters on one side, the Kent Downs on the other, and the business parks of Wrotham, Borough Green and Kings Hill in between.',
      'Sevenoaks district is largely rural and largely protected, which shapes the work. Development is concentrated in the towns of Sevenoaks, Swanley, Westerham and Edenbridge, in infill and brownfield schemes, extensions and conversions, and in the light industrial estates on the district’s edges. The surrounding countryside adds farm buildings, equestrian premises and the estates around Knole and Chevening.',
      'Wrotham itself sits just over the district line in Tonbridge and Malling borough, with a Sevenoaks postal address. Health and safety across the patch is enforced by the HSE for construction and manufacturing and by the district and borough councils, Sevenoaks District Council and Tonbridge and Malling Borough Council, for offices, shops, hospitality and leisure. Kent Fire and Rescue Service covers the whole county.',
    ],
    siteTypes: ['Residential developments and conversions', 'Business parks and light industrial units', 'Retail units in the town centres', 'Groundworks and infrastructure on the M20, M26 and A20', 'Rural, agricultural and estate buildings'],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out'],
    disciplines: ['cdm-2015', 'competent-person', 'risk-assessments-and-method-statements', 'safety-audits-and-site-inspections'],
    nearby: ['tonbridge-and-tunbridge-wells', 'maidstone', 'bromley-and-south-east-london'],
    projects: [],
    faqs: [
      {
        question: 'Where is Stephen based?',
        answer: `At ${ADDRESS_ONE_LINE}, beside junction 2 of the M20 where it meets the M26. Wrotham is in Tonbridge and Malling borough with a Sevenoaks postal address; Sevenoaks town is about seven miles west and Maidstone about nine miles east.`,
      },
      {
        question: 'Who enforces health and safety law in Sevenoaks district?',
        answer:
          'The Health and Safety Executive for construction sites, factories, farms and most industrial premises; Sevenoaks District Council, or Tonbridge and Malling Borough Council for Wrotham and Borough Green, for offices, shops, warehouses, hotels, restaurants and leisure premises, under the Health and Safety (Enforcing Authority) Regulations 1998. Fire safety is enforced by Kent Fire and Rescue Service.',
      },
      {
        question: 'What kind of construction work is typical in West Kent?',
        answer:
          'Residential schemes on brownfield and infill land, house extensions and barn conversions in the villages, refurbishment of commercial units on the estates around Wrotham, Borough Green and Sevenoaks, and school building programmes across the district’s state and independent schools.',
      },
    ],
  },
  {
    slug: 'maidstone',
    seoTitle: 'Health and safety in Maidstone: Stephen Laws',
    name: 'Maidstone',
    area: 'Maidstone, Aylesford and Mid Kent',
    region: 'Mid Kent',
    summary:
      'The county town and its industrial hinterland along the Medway valley: Aylesford, Larkfield, Parkwood and the M20 junctions 5 to 8.',
    localContext: [
      'Maidstone is Kent’s county town and administrative centre, home to Kent County Council, Maidstone Hospital and Mid Kent College. It sits on the M20 between junctions 5 and 8, about nine miles east of Wrotham, and the borough is one of the county’s largest housing growth areas, with major residential schemes on its northern and southern edges.',
      'The industrial base runs along the River Medway to the north-west of the town. Aylesford, Larkfield and New Hythe hold paper, packaging, distribution and manufacturing sites on land that has been industrial for a century; Parkwood and the 20/20 business park serve the town itself; and the quarries and aggregates works of the Medway valley supply the county’s construction sector.',
      'Enforcement is split as everywhere in England: the HSE for construction, manufacturing and the quarries, Maidstone Borough Council for the town’s offices, retail, warehousing and hospitality. Kent Fire and Rescue Service is headquartered in the borough.',
    ],
    siteTypes: ['Large residential developments', 'Paper, packaging and manufacturing plants at Aylesford and New Hythe', 'Aggregates and construction materials in the Medway valley', 'Distribution sheds and light industry on the M20', 'Town-centre retail and commercial fit-out'],
    sectors: ['construction', 'fabrication-and-process', 'civil-engineering', 'retail-fit-out'],
    disciplines: ['cdm-2015', 'safety-audits-and-site-inspections', 'contractor-management', 'risk-assessments-and-method-statements'],
    nearby: ['sevenoaks', 'medway', 'tonbridge-and-tunbridge-wells'],
    projects: [],
    faqs: [
      {
        question: 'How far is Maidstone from Stephen’s base?',
        answer: 'About nine miles east along the A20 and M20; Wrotham sits at junction 2 and Maidstone town centre is reached from junctions 5 to 7.',
      },
      {
        question: 'Which body enforces health and safety in Maidstone?',
        answer:
          'The Health and Safety Executive for construction, manufacturing, quarrying and the NHS; Maidstone Borough Council’s environmental health team for offices, shops, most warehousing and the hospitality trade. Kent Fire and Rescue Service enforces the Fire Safety Order.',
      },
      {
        question: 'What are the main industries around Maidstone?',
        answer:
          'Public administration and health in the town, paper, packaging and manufacturing at Aylesford and New Hythe, distribution along the M20, aggregates and construction materials in the Medway valley, and a large construction sector driven by the borough’s housing growth.',
      },
    ],
  },
  {
    slug: 'medway',
    seoTitle: 'Health and safety in Medway: Stephen Laws',
    name: 'Medway',
    area: 'Medway: Chatham, Gillingham, Rochester and Strood',
    region: 'North Kent',
    summary:
      'The Medway towns and the Hoo Peninsula: the former dockyard, Medway City Estate, Kingsnorth and Grain, industry and regeneration side by side.',
    localContext: [
      'Medway is a unitary authority of five towns, Chatham, Gillingham, Rochester, Strood and Rainham, on the tidal Medway about twelve miles north-east of Wrotham. Since the Royal Dockyard closed in 1984 the area has been in continuous regeneration: Chatham Maritime and the universities’ Medway campus on the dockyard site, Rochester Riverside, and the housing schemes that follow.',
      'The industrial estates are extensive. Medway City Estate at Frindsbury is one of the largest in the South East; Gillingham Business Park serves the east of the conurbation; Kingsnorth on the Hoo Peninsula has moved from power generation to commercial and logistics use; and the Isle of Grain holds the LNG terminal, the port and the heavy industry of the estuary.',
      'The HSE enforces at the port, the estuary sites, construction and manufacturing; Medway Council covers offices, retail, warehousing and hospitality. Kent Fire and Rescue Service covers Medway as part of the county.',
    ],
    siteTypes: ['Heavy industry and energy on the estuary', 'Industrial estates and fabrication workshops', 'Regeneration and residential schemes', 'Riverside and marine civil engineering', 'Retail and commercial units in the five towns'],
    sectors: ['construction', 'fabrication-and-process', 'civil-engineering', 'retail-fit-out'],
    disciplines: ['safety-audits-and-site-inspections', 'cdm-2015', 'accident-investigation', 'temporary-works-and-high-risk-activities'],
    nearby: ['maidstone', 'dartford-and-gravesend', 'sevenoaks'],
    projects: [],
    faqs: [
      {
        question: 'Which towns make up Medway?',
        answer: 'Chatham, Gillingham, Rochester, Strood and Rainham, together with the Hoo Peninsula and the Isle of Grain. Medway Council has been a unitary authority, separate from Kent County Council, since 1998.',
      },
      {
        question: 'How far is Medway from Wrotham?',
        answer: 'About twelve miles: the A20 or M20 to junction 4, then the A228 north through the Malling villages to Strood and Rochester.',
      },
      {
        question: 'What are the largest industrial areas in Medway?',
        answer:
          'Medway City Estate at Frindsbury, Gillingham Business Park, Kingsnorth Commercial Park on the Hoo Peninsula, and the Isle of Grain with its LNG terminal and estuary industry.',
      },
    ],
  },
  {
    slug: 'tonbridge-and-tunbridge-wells',
    seoTitle: 'Tonbridge and Tunbridge Wells: Stephen Laws',
    name: 'Tonbridge and Tunbridge Wells',
    area: 'Tonbridge, Tunbridge Wells, Paddock Wood and the Weald',
    region: 'West Kent',
    summary:
      'Two market towns, the distribution parks at Paddock Wood and the farms and estates of the Weald, along the A21 and A26 south of the M25.',
    localContext: [
      'Tonbridge and Tunbridge Wells sit ten to fifteen miles south of Wrotham on the A26 and A21. Tonbridge is the older, with its castle and school and the industrial estates along Vale Road and Cannon Lane; Royal Tunbridge Wells is the larger, a spa town with a professional-services economy and the North Farm and Longfield Road industrial and retail area on its eastern edge.',
      'Paddock Wood, east of Tonbridge, is a distribution and logistics centre out of proportion to its size, on the rail line and the A228. Beyond it the Weald is farming country: hop gardens, orchards, vineyards and the agricultural and equestrian premises that go with them, together with a steady programme of barn conversions and rural housing.',
      'The HSE enforces on construction, farms and manufacturing; Tonbridge and Malling Borough Council and Tunbridge Wells Borough Council cover offices, retail, warehousing and hospitality in their respective areas. Kent Fire and Rescue Service covers both.',
    ],
    siteTypes: ['Distribution sheds and light industry at Paddock Wood', 'Market-town retail and commercial fit-out', 'Residential schemes and rural conversions', 'Farms, vineyards and rural estates', 'Highways and utilities on the A21 and A26'],
    sectors: ['construction', 'retail-fit-out', 'civil-engineering'],
    disciplines: ['risk-assessments-and-method-statements', 'health-and-safety-training', 'competent-person', 'contractor-management'],
    nearby: ['sevenoaks', 'maidstone', 'ashford'],
    projects: [],
    faqs: [
      {
        question: 'How far are Tonbridge and Tunbridge Wells from Wrotham?',
        answer: 'Tonbridge is about ten miles south via the A20 and A227 or A26; Tunbridge Wells about five miles further on the A26.',
      },
      {
        question: 'Why is Paddock Wood a logistics centre?',
        answer:
          'It sits on the Tonbridge to Ashford rail line and the A228, with the M20 to the north and the A21 to the west, and it has had large distribution sheds since the 1970s. Food, drink and general distribution operators occupy the Transfesa Road and Eldon Way estates.',
      },
      {
        question: 'Which councils enforce health and safety in the two towns?',
        answer:
          'Tonbridge and Malling Borough Council for Tonbridge and Tunbridge Wells Borough Council for Tunbridge Wells and Paddock Wood, for the premises that fall to local authorities: offices, shops, warehouses, hotels, pubs and leisure. Construction, farms and factories fall to the HSE.',
      },
    ],
  },
  {
    slug: 'dartford-and-gravesend',
    seoTitle: 'Dartford and Gravesend: health and safety',
    name: 'Dartford and Gravesend',
    area: 'Dartford, Gravesend, Ebbsfleet and the Thames Gateway',
    region: 'North Kent',
    summary:
      'The Kent Thames Gateway: the Dartford Crossing, Bluewater, Ebbsfleet Garden City and the riverside industry and logistics between the M25 and the estuary.',
    localContext: [
      'Dartford and Gravesend form the Kent end of the Thames Gateway, about thirteen miles north of Wrotham up the A20 and M25. Dartford holds the Queen Elizabeth II bridge and the tunnels that carry the M25 across the Thames, and the business and distribution parks that cluster round them at Crossways, The Bridge and Littlebrook. Bluewater at Greenhithe is one of the largest shopping centres in the country.',
      'Ebbsfleet Garden City, around Ebbsfleet International station, is one of the largest new settlements in the South East and a construction site of a scale the county has rarely seen. Gravesend and Northfleet to its east carry the riverside industry of the estuary, the Port of London Authority’s pilot station, and a long history of cement and paper manufacturing that is now being redeveloped.',
      'The HSE enforces at the construction sites, the riverside industry and the port operations; Dartford Borough Council and Gravesham Borough Council cover offices, retail, warehousing and hospitality. Kent Fire and Rescue Service covers both boroughs.',
    ],
    siteTypes: ['Large-scale residential construction at Ebbsfleet', 'Groundworks, highways and infrastructure round the Crossing', 'Retail fit-out at Bluewater and the retail parks', 'Riverside industry and port operations', 'Commercial and data-centre redevelopment'],
    sectors: ['construction', 'civil-engineering', 'retail-fit-out', 'fabrication-and-process'],
    disciplines: ['cdm-2015', 'temporary-works-and-high-risk-activities', 'safety-audits-and-site-inspections', 'risk-assessments-and-method-statements'],
    nearby: ['medway', 'bromley-and-south-east-london', 'sevenoaks'],
    projects: [],
    faqs: [
      {
        question: 'How far is Dartford from Wrotham?',
        answer: 'About thirteen miles: the A20 to the M25 at junction 3, then north to junction 1b for Dartford, or the A2 for Gravesend and Ebbsfleet.',
      },
      {
        question: 'What is Ebbsfleet Garden City?',
        answer:
          'A new settlement of up to 15,000 homes being built around Ebbsfleet International station between Dartford and Gravesend, overseen by the Ebbsfleet Development Corporation, on former quarry and industrial land. It has been under construction since the mid-2010s and will be for many years.',
      },
      {
        question: 'Which enforcing authority covers Bluewater and the distribution parks?',
        answer:
          'Dartford Borough Council for the shopping centre, its shops and restaurants, and for most warehousing; the HSE for construction and for the sites that fall to it under the Enforcing Authority Regulations. The split is by premises type, not location.',
      },
    ],
  },
  {
    slug: 'ashford',
    seoTitle: 'Health and safety in Ashford: Stephen Laws',
    name: 'Ashford',
    area: 'Ashford, the M20 corridor and the Eurotunnel approach',
    region: 'East Kent',
    summary:
      'Kent’s fastest-growing town: international rail, the M20 to the Channel Tunnel, the Sevington border facility and the logistics and housing that follow.',
    localContext: [
      'Ashford is about thirty miles south-east of Wrotham along the M20, the last major town before the Channel Tunnel terminal at Folkestone. Its growth follows its transport links: Ashford International on High Speed 1, junctions 9 and 10 of the M20, and the Sevington inland border facility opened in 2021 to process freight for the Channel crossings.',
      'The town has been designated for growth for two decades. Chilmington Green is a new community of several thousand homes to the south-west; the Commercial Quarter is bringing offices to the station; and the business parks at Orbital Park, Eureka Park and Waterbrook hold distribution, manufacturing and the truck stop that serves the M20. The William Harvey Hospital and Ashford College are the largest public estates.',
      'The HSE enforces at the border facility, construction sites and manufacturing; Ashford Borough Council covers the town’s offices, retail, warehousing and the hospitality trade that comes with the Designer Outlet. Kent Fire and Rescue Service covers the borough.',
    ],
    siteTypes: ['New-community housing construction', 'Highways and infrastructure on the M20 corridor', 'Business parks, manufacturing and freight', 'Retail fit-out around the station and the Designer Outlet', 'Hospital and college estates'],
    sectors: ['construction', 'civil-engineering', 'fabrication-and-process', 'retail-fit-out'],
    disciplines: ['cdm-2015', 'risk-assessments-and-method-statements', 'health-and-safety-training', 'contractor-management'],
    nearby: ['canterbury-and-east-kent', 'maidstone', 'tonbridge-and-tunbridge-wells'],
    projects: [],
    faqs: [
      {
        question: 'How far is Ashford from Wrotham?',
        answer: 'About thirty miles along the M20 from junction 2 to junctions 9 and 10, roughly forty minutes outside the peaks.',
      },
      {
        question: 'What is the Sevington inland border facility?',
        answer:
          'A government customs and border control site beside junction 10a of the M20, opened in 2021, where HGVs bound for or arriving from the Channel Tunnel and Dover can be checked away from the ports. It is one of the largest freight-handling sites in the county.',
      },
      {
        question: 'What is driving construction in Ashford?',
        answer:
          'Housing growth at Chilmington Green and around the town’s edges, the Commercial Quarter beside the international station, and the logistics sheds that follow the M20 and the border facility. The borough has been a designated growth area since the early 2000s.',
      },
    ],
  },
  {
    slug: 'canterbury-and-east-kent',
    seoTitle: 'Canterbury and East Kent: health and safety',
    name: 'Canterbury and East Kent',
    area: 'Canterbury, Thanet, Dover and the East Kent coast',
    region: 'East Kent',
    summary:
      'The cathedral city and its universities, the Port of Dover, Discovery Park at Sandwich and the coastal towns from Whitstable to Folkestone.',
    localContext: [
      'Canterbury is about thirty-eight miles east of Wrotham by the M20 and A2, or the M2. The city holds three universities, the Kent and Canterbury Hospital, the cathedral and its World Heritage Site, and a compact commercial base at Wincheap and along the Sturry Road; Lakesview business park at Hersden serves the district to the east.',
      'East Kent’s economy is coastal and international. The Port of Dover is the busiest ferry port in the country and the Eurotunnel terminal at Folkestone the fixed link; Discovery Park at Sandwich, on the former pharmaceutical research site, is one of the largest science and business parks in the South East; and Thanet’s towns, Margate, Ramsgate and Broadstairs, combine port operations, regeneration and a tourism economy that runs round to Whitstable and Herne Bay.',
      'The HSE enforces at the ports, the science park’s laboratories and manufacturing, construction and the hospital estates; Canterbury City Council, Dover District Council, Thanet District Council and Folkestone and Hythe District Council cover offices, retail, warehousing and hospitality. Kent Fire and Rescue Service covers all of them.',
    ],
    siteTypes: ['Heritage and city-centre construction', 'Port and cross-Channel infrastructure', 'Science park laboratories and manufacturing', 'Coastal retail and commercial fit-out', 'University, college and hospital estates'],
    sectors: ['construction', 'retail-fit-out', 'fabrication-and-process', 'civil-engineering'],
    disciplines: ['cdm-2015', 'safety-audits-and-site-inspections', 'competent-person', 'health-and-safety-training'],
    nearby: ['ashford', 'medway', 'maidstone'],
    projects: [],
    faqs: [
      {
        question: 'How far is Canterbury from Wrotham?',
        answer: 'About thirty-eight miles: the M20 to junction 7 then the A249 and M2 to junction 7, or the M20 to Ashford and the A28. Around an hour outside the peaks.',
      },
      {
        question: 'What is Discovery Park?',
        answer:
          'A science, technology and business park at Sandwich on the former Pfizer research site, designated an enterprise zone in 2011. It houses laboratories, manufacturing and offices for more than a hundred businesses and is one of the largest employment sites in East Kent.',
      },
      {
        question: 'Which enforcing authorities cover East Kent?',
        answer:
          'The HSE for the ports, construction, manufacturing, laboratories and the NHS; the district councils, Canterbury, Dover, Thanet and Folkestone and Hythe, for offices, shops, warehouses, hotels and leisure in their own areas; and Kent Fire and Rescue Service for fire safety throughout.',
      },
    ],
  },
  {
    slug: 'bromley-and-south-east-london',
    seoTitle: 'Bromley and South East London: Stephen Laws',
    name: 'Bromley and South East London',
    area: 'Bromley, Bexley, Orpington and the London edge',
    region: 'South East London',
    summary:
      'The London boroughs on Kent’s border: Bromley’s suburbs and Cray valley industry, and Bexley’s Thames-side estates at Erith and Belvedere.',
    localContext: [
      'Bromley and Bexley are the two London boroughs that border Kent, about fourteen miles from Wrotham by the A20 and A21 or the M25. Bromley is the largest London borough by area and largely suburban, with the Cray valley industrial area around St Mary Cray and Orpington, Biggin Hill airport and its business park, and the Princess Royal University Hospital at Farnborough.',
      'Bexley to the north is more industrial. Erith and Belvedere hold a long Thames-side strip of manufacturing, waste, energy and logistics, Thamesmead is a regeneration area of London scale, and the borough’s town centres at Bexleyheath, Sidcup and Welling are the usual mix of retail, offices and hospitality.',
      'Inside London the enforcement split is the same as in Kent, HSE for construction, manufacturing and industry, the borough councils for offices, retail, warehousing and hospitality, but fire safety passes to the London Fire Brigade.',
    ],
    siteTypes: ['Suburban residential construction and refurbishment', 'Cray valley and Thames-side industry', 'Waste, energy and logistics at Erith and Belvedere', 'Town-centre retail and commercial fit-out', 'Highways and utilities on the A20, A21 and A2'],
    sectors: ['construction', 'fabrication-and-process', 'civil-engineering', 'retail-fit-out'],
    disciplines: ['cdm-2015', 'contractor-management', 'safety-audits-and-site-inspections', 'risk-assessments-and-method-statements'],
    nearby: ['sevenoaks', 'dartford-and-gravesend', 'tonbridge-and-tunbridge-wells'],
    projects: [],
    faqs: [
      {
        question: 'How far is Bromley from Wrotham?',
        answer: 'About fourteen miles: the A20 towards London and the A224 through Orpington, or the M25 to the A21 at junction 4.',
      },
      {
        question: 'Who enforces fire safety in the London boroughs?',
        answer:
          'The London Fire Brigade, under the Regulatory Reform (Fire Safety) Order 2005, rather than Kent Fire and Rescue Service. Health and safety enforcement follows the same HSE and local-authority split as in Kent, with Bromley and Bexley councils covering the premises that fall to local authorities.',
      },
      {
        question: 'What industry is there in Bexley?',
        answer:
          'A long strip of Thames-side industry at Erith and Belvedere: manufacturing, waste and recycling, energy from waste, aggregates and logistics, served by the river and the A2016. Thamesmead and the riverside are also among the largest regeneration areas in London.',
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
