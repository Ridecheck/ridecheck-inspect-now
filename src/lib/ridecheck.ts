export const BOOKING_URL =
  "https://www.vehicleinspect.com.au/our-packages/#inspectionForm";

export const SAMPLE_REPORT_URL =
  "https://ride-check-mobile.vercel.app/app/report/d84554a9-7d5a-473d-a7fc-ae567f06450f";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/RideCheck+Vehicle+Inspections/@-38.005604,144.9015889,9z/data=!4m6!3m5!1s0x6ad66bd660cc23df:0x14a3cda20fcc0f58!8m2!3d-38.005604!4d144.9015889!16s%2Fg%2F11n68g913y";

export const TERMS_URL = "https://www.vehicleinspect.com.au/terms-and-conditions/";

export const PHONE_DISPLAY = "0424 287 403";
export const PHONE_HREF = "tel:0424287403";
export const WHATSAPP_URL = "https://wa.me/61424287403";

export const trustPoints = [
  "5.0 Google rating",
  "350+ reviews",
  "No dealer associations",
  "48-hour turnaround guaranteed",
];

export type Pkg = {
  name: string;
  price: number;
  duration: string;
  blurb: string;
  popular?: boolean;
  badge?: string;
  inclusions: string[];
  excluded?: string[];
  /** Short duration shown in the small stat pill, e.g. "45–60 min" */
  durationShort?: string;
  /** Photo count shown in the small stat pill, e.g. "19+ photos" */
  photos?: string;
  /** Label used for the "View sample … report" link */
  sampleLabel?: string;
};

export const packages: Pkg[] = [
  {
    name: "Standard Inspection",
    price: 299,
    duration: "45–60 minutes",
    durationShort: "45–60 min",
    photos: "19+ photos",
    sampleLabel: "Standard",
    blurb:
      "A thorough mechanical assessment for buyers who can see the car themselves.",
    inclusions: [
      "Full mechanical inspection — engine, exterior, interior, wheels and underside",
      "Diagnostic scan and road test",
      "19+ high-quality photos",
      "Free PPSR report confirming the car isn't encumbered",
      "Instant digital report plus a call with the inspecting mechanic",
    ],
    excluded: [
      "Paint depth readings on every panel",
      "Odometer tamper check",
      "35+ photos + valuation guide",
    ],
  },
  {
    name: "Premium Inspection",
    price: 379,
    duration: "70–90 minutes",
    popular: true,
    badge: "Popular",
    blurb:
      "Full accident and body history. Built for interstate and remote buyers.",
    inclusions: [
      "360° photo coverage — 35+ photos from every angle: exterior, interior, engine bay and underside",
      "Paint & repair check — paint depth readings across all panels to help spot signs of previous repairs, resprays or panel damage",
      "Odometer check — we look for signs of tampering and compare the reading against any records available on the day",
      "Everything in the Standard Inspection",
    ],
  },
];

export type ComparisonValue = boolean | string;

export type ComparisonRow = {
  feature: string;
  standard: ComparisonValue;
  premium: ComparisonValue;
};

export type ComparisonGroup = {
  label: string;
  rows: ComparisonRow[];
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    label: "Inspection scope",
    rows: [
      { feature: "Full mechanical inspection", standard: true, premium: true },
      { feature: "Diagnostic scan & road test", standard: true, premium: true },
      { feature: "Road test drivetrain notes", standard: true, premium: true },
      { feature: "Mechanic phone call", standard: true, premium: true },
    ],
  },
  {
    label: "Photos & documentation",
    rows: [
      { feature: "Photo coverage", standard: "19+", premium: "35+ (360°)" },
      { feature: "Instant digital report", standard: true, premium: true },
      { feature: "Free PPSR report", standard: true, premium: true },
    ],
  },
  {
    label: "Premium-only checks",
    rows: [
      { feature: "Paint depth readings — all panels", standard: false, premium: true },
      { feature: "Odometer tamper check", standard: false, premium: true },
      { feature: "Valuation guide", standard: false, premium: true },
    ],
  },
];

export const differentiators = [
  {
    title: "No dealer associations",
    body: "We take no referral fees and hold no dealer relationships. The report says what the car is, not what someone wants you to hear.",
  },
  {
    title: "90+ photos and video",
    body: "Engine, underbody, panels, interior and a running-engine video walkthrough. Enough to judge the car without standing next to it.",
  },
  {
    title: "Written summary, then a real call",
    body: "A technician-written summary, followed by a direct phone call with the mechanic who inspected the car.",
  },
  {
    title: "Free PPSR and history checks",
    body: "Finance owing, written-off and stolen status, odometer comparison and accident detection — included, not upsold.",
  },
];

export const recentInspections = [
  { vehicle: "2015 Ford Falcon XR6", location: "Geelong, VIC", score: "82/100" },
  { vehicle: "2019 Mazda CX-5 Touring", location: "Brighton, VIC", score: "91/100" },
  { vehicle: "2017 Toyota HiLux SR5", location: "Parramatta, NSW", score: "74/100" },
];

export const steps = [
  {
    title: "Book and pay online",
    body: "Choose your package and a time that suits. Full payment at booking, instant confirmation — no phone tag.",
  },
  {
    title: "Our expert connects with you",
    body: "An inspector calls to confirm details, arrange access with the seller and answer anything before we go out.",
  },
  {
    title: "On-site inspection",
    body: "We come to the car. Mechanical, body and chassis, interior, diagnostic scan and road test.",
  },
  {
    title: "Same-day report emailed",
    body: "Photos, video and a written summary in your inbox, usually within two to three hours, then a call to walk you through it.",
  },
];

export const reviews = [
  {
    name: "J K",
    body: "Detailed, specific and honest. As an interstate buyer, Dion put my mind at ease with his post inspection report. Even though the vehicle had electronic issues, he offered to come back once fixed and complete the inspection for no extra cost.",
  },
  {
    name: "Eleonora Adam",
    body: "We were extremely impressed by the prompt and efficient service provided by Dion. He booked the inspection with the dealer very quickly, and we were provided with an extensive and detailed report surprisingly fast.",
  },
  {
    name: "Alex",
    body: "Dion was AMAZING! Responsive, thorough and transparent throughout the whole inspection process. I confidently purchased my car based on his detailed report and our follow up phone conversation.",
  },
  {
    name: "Beccacino",
    body: "Fantastic and prompt service — he was able to inspect the car the following day. The report along with the photos and videos are clear and thorough. The follow up phone call to discuss the findings was greatly appreciated.",
  },
];

export const faqs = [
  {
    q: "How long does the inspection take?",
    a: "It depends on the model and its condition, but most inspections run 60 to 90 minutes on site. A Standard Inspection is typically 45–60 minutes; a Premium Inspection is 70–90 minutes.",
  },
  {
    q: "When do I get the report?",
    a: "The same day. We prepare and email the report once we finish, usually within two to three hours. Your technician then calls you to talk through what they found.",
  },
  {
    q: "Are your mechanics qualified?",
    a: "Yes. Our inspectors are trained automotive technicians with years of hands-on experience across a wide range of makes and models, and every report is written by the person who inspected the car.",
  },
  {
    q: "Do I need to be there?",
    a: "No. We are fully mobile and come to the car, wherever it is — dealership, private seller or driveway. We arrange access with the seller directly. Plenty of our clients are interstate and buy on the strength of the report, photos, video and follow-up call.",
  },
  {
    q: "What does the inspection cover?",
    a: "VIN validation, engine condition, diagnostic scan, road test, body and chassis including paint depth, interior electronics and controls, accident detection, plus a PPSR report and background checks. You receive a minimum of 90 photos and videos with a technician-written summary.",
  },
];

export type ServiceArea = {
  state: string;
  status: "live" | "soon";
  blurb: string;
  suburbs: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    state: "Victoria",
    status: "live",
    blurb: "Melbourne metro and surrounds, same day or next day in most suburbs.",
    suburbs: [
      "Melbourne CBD",
      "Brunswick",
      "Richmond",
      "Footscray",
      "Dandenong",
      "Frankston",
      "Ringwood",
      "Werribee",
      "Craigieburn",
      "Geelong",
      "Ballarat",
      "Bendigo",
    ],
  },
  {
    state: "New South Wales",
    status: "live",
    blurb: "Sydney metro from the Northern Beaches to the Illawarra.",
    suburbs: [
      "Sydney CBD",
      "Parramatta",
      "Liverpool",
      "Blacktown",
      "Bankstown",
      "Chatswood",
      "Penrith",
      "Sutherland",
      "Hornsby",
      "Campbelltown",
      "Wollongong",
      "Central Coast",
    ],
  },
  {
    state: "South Australia",
    status: "soon",
    blurb: "Adelaide launching soon. Join the waitlist and we'll call you first.",
    suburbs: [
      "Adelaide CBD",
      "Port Adelaide",
      "Norwood",
      "Glenelg",
      "Elizabeth",
      "Salisbury",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* EV inspections                                                      */
/* ------------------------------------------------------------------ */

/**
 * EV packages are a separate tier on purpose — a Standard or Premium booking
 * never includes battery testing, so EV buyers must pick one of these.
 */
export const evPackages: Pkg[] = [
  {
    name: "EV Battery Health Test",
    price: 250,
    duration: "15–20 minutes",
    blurb:
      "Certified Aviloo State of Health test on its own — for buyers who only need the battery verified.",
    inclusions: [
      "Certified Aviloo battery test — State of Health (SoH %) measured, not estimated",
      "Remaining usable capacity analysis",
      "Degradation benchmark — compared against the same model and age",
    ],
    excluded: [
      "Full vehicle inspection & road test",
      "Charging system and cable check",
      "Free PPSR check",
    ],
  },
  {
    name: "EV Inspection + Aviloo Battery Test",
    price: 489,
    duration: "90–120 minutes",
    popular: true,
    badge: "Best value",
    blurb:
      "Our full EV pre-purchase inspection combined with the certified Aviloo battery health test.",
    inclusions: [
      "Full EV pre-purchase inspection — exterior, interior, brakes, suspension and tyres",
      "Road test — drivetrain, regen braking and ride quality",
      "Full system fault scan — current and stored codes",
      "Charging system and cable check, plus free PPSR check",
      "Certified Aviloo battery test and official PDF report",
    ],
  },
];


export const evReasons = [
  {
    title: "The battery is the car",
    body: "It's the single most expensive component in the vehicle. A tired pack can wipe out far more than you saved on the purchase price.",
  },
  {
    title: "The dash range readout lies",
    body: "Guess-o-meter range is calculated from recent driving, not pack condition. It tells you almost nothing about real degradation.",
  },
  {
    title: "Degradation is invisible",
    body: "A five-year-old EV can look immaculate and still have lost a large slice of usable capacity. Only a proper test shows it.",
  },
  {
    title: "Warranty gaps catch buyers out",
    body: "Battery warranties have capacity thresholds, transfer rules and service conditions. We tell you where the car actually sits.",
  },
];

export const evSteps = [
  {
    title: "Request your EV inspection",
    body: "Choose your package and a day that suits. EV days are limited to when a certified tester is rostered on.",
  },
  {
    title: "We match an Aviloo-certified inspector",
    body: "Only certified testers can run the Aviloo test, so we confirm your inspector and exact time by SMS.",
  },
  {
    title: "Test performed on site",
    body: "The tester connects to the vehicle, runs the diagnostics and inspects the car wherever it is — dealer, private seller or home.",
  },
  {
    title: "Report the same day",
    body: "You get the digital inspection report plus the official Aviloo battery health PDF, and a call to walk through it.",
  },
];

export const evFaqs = [
  {
    q: "Which vehicles can you test?",
    a: "Full battery electric vehicles and plug-in hybrids from most major brands. Tell us the make, model and year when you book and we'll confirm compatibility before we take payment.",
  },
  {
    q: "What does State of Health actually mean?",
    a: "State of Health is the pack's remaining usable capacity as a percentage of its original capacity. It's the number that determines real range and resale value, and it's what the Aviloo test measures.",
  },
  {
    q: "How long does the battery test take?",
    a: "The battery test itself takes roughly 45 to 60 minutes on site. Combined with a full EV inspection, allow 90 to 120 minutes.",
  },
  {
    q: "Why is EV availability limited?",
    a: "Only Aviloo-certified inspectors can perform the test, and we have a small certified team across Melbourne and Sydney. That's why EV bookings show fewer available days than standard inspections.",
  },
  {
    q: "Where do you offer EV inspections?",
    a: "Melbourne and Sydney today. Adelaide is next — join the waitlist in the booking flow and we'll contact you the moment certified testing goes live there.",
  },
];

export type InspectionCategory = {
  name: string;
  icon: "engine" | "wheels" | "body" | "diagnostics" | "road" | "history" | "battery" | "charging";
  blurb: string;
  points: string[];
};

export const inspectionCategories: InspectionCategory[] = [
  {
    name: "Engine & Mechanical",
    icon: "engine",
    blurb:
      "The components that keep the car moving — leaks, wear, faults and signs of poor maintenance.",
    points: [
      "Engine oil level",
      "Oil leaks",
      "Coolant level",
      "Coolant leaks",
      "Hoses and pipes",
      "Belts and pulleys",
      "Water pump",
      "Battery and charging",
      "Engine mounts",
      "Exhaust system",
      "Fuel system",
      "Running noise",
      "Overheating signs",
      "Air intake system",
      "Fluid condition",
      "Engine performance",
    ],
  },
  {
    name: "Wheels, Brakes & Suspension",
    icon: "wheels",
    blurb: "Everything between the car and the road, including safety-critical wear items.",
    points: [
      "Tyre tread depth",
      "Tyre age and brand match",
      "Uneven wear patterns",
      "Wheel and rim damage",
      "Spare, jack and tools",
      "Brake pad life",
      "Brake disc condition",
      "Brake fluid level",
      "Handbrake operation",
      "Brake shudder",
      "Shock absorbers",
      "Springs and bushes",
      "Steering play",
      "Wheel bearings",
      "Ball joints",
      "CV boots",
    ],
  },
  {
    name: "Body & Exterior",
    icon: "body",
    blurb: "Panel, paint and structural checks that reveal prior damage or repairs.",
    points: [
      "Paint depth readings",
      "Prior repair detection",
      "Panel gaps and alignment",
      "Rust and corrosion",
      "Dents and scratches",
      "Windscreen and glass",
      "Lights and lenses",
      "Mirrors",
      "Doors, locks and hinges",
      "Boot and bonnet operation",
      "Underbody condition",
      "Chassis rail inspection",
      "Weather seals",
      "Wipers and washers",
    ],
  },
  {
    name: "Diagnostics & Electronics",
    icon: "diagnostics",
    blurb: "A full computer scan plus a hands-on test of the electrics and cabin tech.",
    points: [
      "Full OBD fault code scan",
      "Stored and pending codes",
      "Airbag and SRS warnings",
      "ABS and traction systems",
      "Dashboard warning lights",
      "Air conditioning operation",
      "Heater and demister",
      "Infotainment and audio",
      "Cameras and sensors",
      "Cruise control",
      "Windows and central locking",
      "Seats and seatbelts",
      "Interior lighting",
      "Key and remote function",
    ],
  },
  {
    name: "Road Test & Drivetrain",
    icon: "road",
    blurb: "A real drive on real roads — the fastest way to find faults a static check misses.",
    points: [
      "Cold start behaviour",
      "Idle quality",
      "Acceleration under load",
      "Gearbox operation",
      "Clutch engagement",
      "Transmission clunking",
      "Differential noise",
      "Drivetrain slack",
      "4WD or AWD system",
      "Steering and tracking",
      "Braking performance",
      "Suspension noise",
      "Cabin noise and vibration",
      "Operating temperature",
    ],
  },
  {
    name: "History & Documentation",
    icon: "history",
    blurb: "The paperwork behind the car, checked against national databases.",
    points: [
      "PPSR finance owing check",
      "Written-off register",
      "Stolen vehicle check",
      "Odometer comparison",
      "Registration status",
      "VIN and compliance plate",
      "Service history review",
      "Logbook stamps",
      "Prior sale data",
      "Valuation guidance",
    ],
  },
];

export const evInspectionCategories: InspectionCategory[] = [
  {
    name: "Battery & State of Health",
    icon: "battery",
    blurb: "A certified Aviloo test reading the pack directly — not the dashboard estimate.",
    points: [
      "State of Health (SoH %)",
      "Usable capacity vs new",
      "Degradation vs same model and age",
      "Cell-level irregularities",
      "Module balance",
      "Pack temperature behaviour",
      "Thermal management operation",
      "Real-world range today",
      "Original factory range comparison",
      "Battery warranty status",
      "Coolant loop for the pack",
      "Official Aviloo certificate (PDF)",
    ],
  },
  {
    name: "High-Voltage System",
    icon: "diagnostics",
    blurb: "Safety-critical high-voltage components checked by a trained EV technician.",
    points: [
      "HV cable condition and routing",
      "Orange loom insulation",
      "Connector integrity",
      "Isolation resistance",
      "HV service disconnect",
      "Contactor operation",
      "DC-DC converter",
      "12V system and auxiliary battery",
      "HV fault codes",
      "Underfloor pack shielding",
      "Signs of impact to the pack",
      "Moisture ingress indicators",
    ],
  },
  {
    name: "Charging & Ports",
    icon: "charging",
    blurb: "AC and DC charging verified on site, including cables and port hardware.",
    points: [
      "AC charge test",
      "DC fast charge behaviour",
      "Charge port latch and pins",
      "Port seal and corrosion",
      "Onboard charger operation",
      "Charge rate consistency",
      "Charging error codes",
      "Supplied cables and adaptors",
      "Scheduled charging settings",
      "Charge limit configuration",
    ],
  },
  {
    name: "Drive Motor & Inverter",
    icon: "engine",
    blurb: "Motor, inverter and reduction gear checked under load on a road test.",
    points: [
      "Motor noise under load",
      "Inverter fault codes",
      "Reduction gear noise",
      "Driveshafts and CV boots",
      "Regenerative braking operation",
      "Power delivery consistency",
      "Coolant level and leaks",
      "Motor mounts",
      "Reduced power warnings",
      "Cold start and idle systems",
    ],
  },
  {
    name: "Body, Brakes & Suspension",
    icon: "wheels",
    blurb: "EVs are heavy — tyres, brakes and suspension wear differently and get extra attention.",
    points: [
      "Tyre tread and load rating",
      "Uneven wear from pack weight",
      "Brake pad life",
      "Disc corrosion from low brake use",
      "Suspension and bushes",
      "Steering and tracking",
      "Panel gaps and prior repair",
      "Paint depth readings",
      "Underbody and pack guard",
      "Rust and corrosion",
      "Glass and lights",
      "Weather seals",
    ],
  },
  {
    name: "Diagnostics & History",
    icon: "history",
    blurb: "Software, recalls and paperwork checked against national databases.",
    points: [
      "Full fault code scan",
      "Software version and updates",
      "Outstanding recalls",
      "PPSR finance owing check",
      "Written-off register",
      "Stolen vehicle check",
      "Odometer comparison",
      "Service history review",
      "Registration status",
      "Prior sale data",
    ],
  },
];
