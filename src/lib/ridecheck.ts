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
  inclusions: string[];
};

export const packages: Pkg[] = [
  {
    name: "Standard Inspection",
    price: 299,
    duration: "45–60 minutes",
    blurb:
      "A thorough mechanical assessment for buyers who can see the car themselves.",
    inclusions: [
      "Visual condition assessment of engine, underbody, exterior, interior and wheels",
      "19+ high-quality photos of key areas",
      "Diagnostic scan of engine management systems",
      "Road test to evaluate performance",
      "Free PPSR report confirming the car isn't encumbered",
      "Instant digital report delivered on completion",
      "Phone call with the inspecting mechanic to discuss findings",
    ],
  },
  {
    name: "Premium Inspection",
    price: 379,
    duration: "70–90 minutes",
    popular: true,
    blurb:
      "Full accident and body history. Built for interstate and remote buyers.",
    inclusions: [
      "Everything in the Standard Inspection, plus:",
      "35+ photos covering exterior, interior and underbody",
      "Video walkthrough of interior, exterior and the engine running",
      "Full body condition report with paint depth readings and prior damage detection",
      "Free CarHistory report (valued at $41.95): odometer, damage, stolen and written-off checks, valuation, registration and prior sale data",
      "Instant digital report delivered on completion",
      "Advanced paint, damage and repair assessment tooling",
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
