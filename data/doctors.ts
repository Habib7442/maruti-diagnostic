export type MedicalDepartment =
  | "Neurosurgery"
  | "Medicine"
  | "Gynaecology"
  | "ENT"
  | "Orthopaedics"
  | "Paediatrics"
  | "Dermatology"
  | "Surgery"
  | "Psychiatry";

/**
 * Source of truth: the centre owner's daily chamber board, the "Our Associated Doctor"
 * banner, and the doctors' own prescription pads (received 2026-10-03).
 * Timings and fees exist only for daily chamber doctors; associated doctors see
 * patients by appointment until the owner supplies their schedule.
 */
export interface Doctor {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  department: MedicalDepartment;
  qualifications: string[];
  chamberTiming: string;
  fee: number | null;
  type: "daily" | "visiting";
  bio: string;
  conditionsTreated: string[];
  photoUrl?: string;
  displayOrder: number;
}

export const DOCTORS: Doctor[] = [
  // --- Daily chamber (owner's chamber board) ---
  {
    id: "dr-surajit-kr-sen",
    name: "Dr. Surajit Kr. Sen",
    slug: "dr-surajit-kr-sen-neuro-psychiatrist-silchar",
    specialty: "Consultant Neuro-Psychiatrist",
    department: "Psychiatry",
    qualifications: ["MBBS", "MD (SMC&H)"],
    chamberTiming: "3:00 PM - 4:00 PM",
    fee: 600,
    type: "daily",
    bio: "Dr. Surajit Kr. Sen (MBBS, MD) is a Consultant Neuro-Psychiatrist with a daily chamber from 3:00 PM to 4:00 PM at Maruti Diagnostic Centre, SMC Point, Ghungoor, opposite SMCH, Silchar. He sees adults with mental health and neuropsychiatric concerns such as depression, anxiety, sleep problems and memory complaints.",
    conditionsTreated: [
      "Depression and mood disorders",
      "Anxiety and panic attacks",
      "Obsessive compulsive disorder (OCD)",
      "Sleep problems and insomnia",
      "Memory and behaviour changes",
    ],
    displayOrder: 1,
  },
  {
    id: "dr-rajsekhar-chakraborty",
    name: "Dr. Rajsekhar Chakraborty",
    slug: "dr-rajsekhar-chakraborty-physician-silchar",
    specialty: "Physician (Medicine)",
    department: "Medicine",
    qualifications: ["MBBS", "MD (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Rajsekhar Chakraborty (MBBS, MD, Medicine) is a physician with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. He sees adults for general medical problems including fever, diabetes, blood pressure and thyroid conditions.",
    conditionsTreated: [
      "Diabetes",
      "High blood pressure",
      "Thyroid disorders",
      "Fever and infections",
      "Cough and breathing complaints",
    ],
    displayOrder: 2,
  },
  {
    id: "dr-rieona-saha",
    name: "Dr. Rieona Saha",
    slug: "dr-rieona-saha-gynaecologist-silchar",
    specialty: "Gynaecologist",
    department: "Gynaecology",
    qualifications: ["MBBS", "MS (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Rieona Saha (MBBS, MS) is a gynaecologist with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. She sees women for pregnancy care, period problems, PCOS and other gynaecological concerns.",
    conditionsTreated: [
      "Pregnancy check-ups",
      "PCOS and PCOD",
      "Irregular or painful periods",
      "Infertility evaluation",
      "Pelvic pain and infections",
    ],
    displayOrder: 3,
  },
  {
    id: "dr-saleha-choudhury",
    name: "Dr. Saleha Choudhury",
    slug: "dr-saleha-choudhury-ent-specialist-silchar",
    specialty: "ENT Specialist",
    department: "ENT",
    qualifications: ["MBBS", "MS (ENT) (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Saleha Choudhury (MBBS, MS ENT) is an ear, nose and throat specialist with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. She sees patients of all ages for ear, nose, sinus and throat problems.",
    conditionsTreated: [
      "Ear pain, discharge and hearing loss",
      "Sinusitis and blocked nose",
      "Tonsillitis and sore throat",
      "Vertigo and dizziness",
      "Allergic rhinitis",
    ],
    displayOrder: 4,
  },
  {
    id: "dr-bashab-bijoy-roy",
    name: "Dr. Bashab Bijoy Roy",
    slug: "dr-bashab-bijoy-roy-laparoscopic-surgeon-silchar",
    specialty: "Laparoscopic Surgeon",
    department: "Surgery",
    qualifications: ["MBBS", "MS (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Bashab Bijoy Roy (MBBS, MS) is a surgeon trained in laparoscopic surgery, with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. He sees patients for surgical opinions on gallstones, hernia, piles and other abdominal conditions.",
    conditionsTreated: [
      "Gallbladder stones",
      "Hernia",
      "Appendicitis",
      "Piles, fissure and fistula",
      "Lumps and minor surgical problems",
    ],
    displayOrder: 5,
  },
  {
    id: "dr-sourav-nath",
    name: "Dr. Sourav Nath",
    slug: "dr-sourav-nath-physician-silchar",
    specialty: "Consultant Physician",
    department: "Medicine",
    qualifications: ["MBBS", "MD (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Sourav Nath (MBBS, MD) is a Consultant Physician with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. He sees adults for diabetes, blood pressure, stomach complaints, fevers and routine health check-ups.",
    conditionsTreated: [
      "Diabetes",
      "High blood pressure",
      "Acidity and stomach complaints",
      "Fever and viral illness",
      "Routine health check-ups",
    ],
    displayOrder: 6,
  },
  {
    id: "dr-n-hrangchal",
    name: "Dr. N. Hrangchal",
    slug: "dr-n-hrangchal-orthopaedic-surgeon-silchar",
    specialty: "Orthopaedic Specialist",
    department: "Orthopaedics",
    qualifications: ["MBBS", "MS (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. N. Hrangchal (MBBS, MS, Orthopaedics) is an orthopaedic specialist with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. He sees patients for bone, joint and back problems, fractures and sports injuries.",
    conditionsTreated: [
      "Knee and joint pain",
      "Fractures and injuries",
      "Back and neck pain",
      "Ligament and tendon injuries",
      "Frozen shoulder",
    ],
    displayOrder: 7,
  },
  {
    id: "dr-sujit-nath-choudhury",
    name: "Dr. Sujit Nath Choudhury",
    slug: "dr-sujit-nath-choudhury-paediatrician-silchar",
    specialty: "Paediatrician",
    department: "Paediatrics",
    qualifications: ["DCH", "MD (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Sujit Nath Choudhury (DCH, MD) is a paediatrician (child specialist) with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. He sees newborns, infants and children for illness, growth and vaccination advice.",
    conditionsTreated: [
      "Fever and common childhood illness",
      "Newborn and infant check-ups",
      "Cough, wheezing and allergies",
      "Vaccination advice",
      "Stomach upsets in children",
    ],
    displayOrder: 8,
  },
  {
    id: "dr-fakrul-islam-mozumder",
    name: "Dr. Fakrul Islam Mozumder",
    slug: "dr-fakrul-islam-mozumder-ent-silchar",
    specialty: "ENT Specialist",
    department: "ENT",
    qualifications: ["MBBS", "MS (SMC&H)"],
    chamberTiming: "4:00 PM - 5:00 PM",
    fee: 500,
    type: "daily",
    bio: "Dr. Fakrul Islam Mozumder (MBBS, MS, ENT) is an ear, nose and throat specialist with a daily chamber from 4:00 PM to 5:00 PM at Maruti Diagnostic Centre, Ghungoor, opposite SMCH, Silchar. He sees patients for ear infections, blocked nose, tonsils and voice problems.",
    conditionsTreated: [
      "Ear infections and ear pain",
      "Blocked nose and sinusitis",
      "Tonsil and adenoid problems",
      "Foreign body in ear or nose",
      "Hoarse voice",
    ],
    displayOrder: 9,
  },

  // --- Associated doctors (by appointment) ---
  {
    id: "dr-sridham-sutradhar",
    name: "Dr. Sridham Sutradhar",
    slug: "dr-sridham-sutradhar-neurosurgeon-silchar",
    specialty: "Consultant Neurosurgeon",
    department: "Neurosurgery",
    qualifications: [
      "MBBS",
      "MS",
      "MCh (Neurosurgery)",
      "Fellowship in Endoscopic Brain & Spine Surgery",
    ],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Sridham Sutradhar (MBBS, MS, MCh Neurosurgery) is a Consultant Neurosurgeon who holds his chamber at Maruti Diagnostic Centre, SMC Point, Ghungoor, Silchar. He has a fellowship in endoscopic brain and spine surgery and sees patients for spine, brain and nerve problems.",
    conditionsTreated: [
      "Slip disc and spine problems",
      "Sciatica and nerve compression",
      "Head injury follow-up",
      "Brain tumour evaluation",
      "Neck pain and cervical spondylosis",
    ],
    displayOrder: 10,
  },
  {
    id: "dr-shromona-kar",
    name: "Dr. Shromona Kar",
    slug: "dr-shromona-kar-dermatologist-silchar",
    specialty: "Dermatologist & Cosmetologist",
    department: "Dermatology",
    qualifications: [
      "MBBS",
      "MD (Dermatology, Venereology & Leprosy)",
      "Fellowship in Cosmetology and Facial Aesthetics",
    ],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Shromona Kar (MBBS, MD Dermatology, Venereology & Leprosy) is a dermatologist who holds her chamber at Maruti Diagnostic Centre, SMC Point, Ghungoor, Silchar. She is faculty at Silchar Medical College, has a fellowship in cosmetology and facial aesthetics, and sees patients for skin, hair and nail problems.",
    conditionsTreated: [
      "Acne and acne scars",
      "Psoriasis and eczema",
      "Fungal skin infections",
      "Hair fall",
      "Pigmentation and melasma",
    ],
    displayOrder: 11,
  },
  {
    id: "dr-ayan-purkayastha",
    name: "Dr. Ayan Purkayastha",
    slug: "dr-ayan-purkayastha-medicine-diabetes-silchar",
    specialty: "Consultant Medicine & Diabetes",
    department: "Medicine",
    qualifications: ["MBBS", "MD", "PGDCC (Certified by RCP, UK)", "PGCDM"],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Ayan Purkayastha (MBBS, MD, PGDCC, PGCDM) is a consultant in medicine and diabetes associated with Maruti Diagnostic Centre, Ghungoor, Silchar. His PGDCC is certified by the Royal College of Physicians, UK. He sees patients by appointment for diabetes, blood pressure and cholesterol.",
    conditionsTreated: [
      "Diabetes and high blood sugar",
      "Diabetic nerve and foot problems",
      "High cholesterol",
      "High blood pressure",
    ],
    displayOrder: 12,
  },
  {
    id: "dr-sauradeep-sarkar",
    name: "Dr. Sauradeep Sarkar",
    slug: "dr-sauradeep-sarkar-general-laparoscopic-surgeon-silchar",
    specialty: "General & Laparoscopic Surgeon",
    department: "Surgery",
    qualifications: ["MBBS", "MS", "FMAS", "EFIAGES"],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Sauradeep Sarkar (MBBS, MS, FMAS, EFIAGES) is a general and laparoscopic surgeon at SMCH and an associated doctor at Maruti Diagnostic Centre, Ghungoor, Silchar. A gold medalist who trained at IPGMER/SSKM Hospital, Kolkata, he sees patients by appointment for hernia, gallbladder and other surgical problems.",
    conditionsTreated: [
      "Hernia",
      "Gallbladder stones",
      "Piles and fissure",
      "Abdominal surgical opinions",
    ],
    displayOrder: 13,
  },
  {
    id: "dr-bagdatta-paul",
    name: "Dr. Bagdatta Paul",
    slug: "dr-bagdatta-paul-ent-surgeon-silchar",
    specialty: "ENT Surgeon",
    department: "ENT",
    qualifications: ["MBBS", "MS (ENT, Gold Medalist)"],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Bagdatta Paul (MBBS, MS ENT, gold medalist) is an ear, nose and throat surgeon associated with Maruti Diagnostic Centre, Ghungoor, Silchar. Patients see Dr. Paul by appointment for long-standing ear disease, nasal blockage and throat problems.",
    conditionsTreated: [
      "Ear drum perforation",
      "Chronic ear discharge",
      "Deviated nasal septum",
      "Throat and voice problems",
    ],
    displayOrder: 14,
  },
  {
    id: "dr-siddhartha-k-dutta",
    name: "Dr. Siddhartha K. Dutta",
    slug: "dr-siddhartha-k-dutta-medicine-gastroenterology-silchar",
    specialty: "Medicine & Gastroenterology",
    department: "Medicine",
    qualifications: [
      "MBBS",
      "DTM&H (UK)",
      "PG.DFM (CMC, Vellore)",
      "FICM",
      "D.Diab",
      "MO (Critical Care)",
    ],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Siddhartha K. Dutta (MBBS, DTM&H UK, PG.DFM CMC Vellore, FICM, D.Diab) practises medicine and gastroenterology in the Department of Medicine, SMCH, and is an associated doctor at Maruti Diagnostic Centre, Ghungoor, Silchar. He sees patients by appointment for stomach, liver and general medical problems.",
    conditionsTreated: [
      "Acidity, gastritis and reflux",
      "Fatty liver",
      "Irritable bowel and indigestion",
      "Diabetes",
    ],
    displayOrder: 15,
  },
  {
    id: "dr-mina-mazumder",
    name: "Dr. Mina Mazumder",
    slug: "dr-mina-mazumder-paediatrics-silchar",
    specialty: "Paediatrician",
    department: "Paediatrics",
    qualifications: ["MBBS", "MD (Paediatrics)"],
    chamberTiming: "By appointment",
    fee: null,
    type: "visiting",
    bio: "Dr. Mina Mazumder (MBBS, MD Paediatrics) is a paediatrician from Silchar Medical College & Hospital and an associated doctor at Maruti Diagnostic Centre, Ghungoor, Silchar. She sees infants and children by appointment for illness, feeding and growth concerns.",
    conditionsTreated: [
      "Infant and toddler health",
      "Feeding and weight concerns",
      "Fever and cough in children",
      "Growth and development checks",
    ],
    displayOrder: 16,
  },
];

export const DAILY_DOCTOR_COUNT = DOCTORS.filter((d) => d.type === "daily").length;

export const DEPARTMENTS: { label: string; value: MedicalDepartment | "All" }[] = [
  { label: "All specialists", value: "All" },
  { label: "Neurosurgery", value: "Neurosurgery" },
  { label: "Medicine", value: "Medicine" },
  { label: "Gynaecology", value: "Gynaecology" },
  { label: "ENT", value: "ENT" },
  { label: "Orthopaedics", value: "Orthopaedics" },
  { label: "Paediatrics", value: "Paediatrics" },
  { label: "Dermatology", value: "Dermatology" },
  { label: "Surgery", value: "Surgery" },
  { label: "Psychiatry", value: "Psychiatry" },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((doctor) => doctor.slug === slug);
}

export function getAllDoctorSlugs(): string[] {
  return DOCTORS.map((doctor) => doctor.slug);
}

export function getRelatedDoctors(
  currentDoctorId: string,
  department: MedicalDepartment,
  limit: number = 3
): Doctor[] {
  // First look for doctors in the same department
  const sameDept = DOCTORS.filter(
    (doc) => doc.id !== currentDoctorId && doc.department === department
  );
  if (sameDept.length >= limit) {
    return sameDept.slice(0, limit);
  }
  // Fill remaining slots with other daily specialists
  const others = DOCTORS.filter(
    (doc) =>
      doc.id !== currentDoctorId &&
      doc.department !== department &&
      doc.type === "daily"
  );
  return [...sameDept, ...others].slice(0, limit);
}

/** Two-letter monogram shown until a real photo of the doctor is supplied. */
export function getDoctorInitials(name: string): string {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
