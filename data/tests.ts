export type TestCategory = "Pathology" | "Imaging" | "Cardiac" | "Endoscopy";

export interface MedicalTest {
  id: string;
  name: string;
  slug: string;
  category: TestCategory;
  shortDescription: string;
  clinicalImportance: string;
  preparation: string;
  reportTurnaround: string;
  price?: number | null;
  isPopular?: boolean;
  sampleType?: string; // e.g. "Blood", "Urine", "N/A (Imaging)"
}

export const TESTS: MedicalTest[] = [
  // --- Pathology ---
  {
    id: "cbc-test",
    name: "Complete Blood Count (CBC / Hemogram)",
    slug: "cbc-test-silchar",
    category: "Pathology",
    shortDescription: "Evaluates overall health, detecting anaemia, acute infections, and blood disorders.",
    clinicalImportance: "Essential screening test measuring red blood cells, white blood cells, haemoglobin, and platelets.",
    preparation: "No fasting required. Routine blood sample.",
    reportTurnaround: "Same day (within 3 to 4 hours)",
    price: 350,
    isPopular: true,
    sampleType: "Blood (EDTA)",
  },
  {
    id: "thyroid-profile",
    name: "Thyroid Profile (Total T3, T4, TSH)",
    slug: "thyroid-profile-test-silchar",
    category: "Pathology",
    shortDescription: "Comprehensive assessment of thyroid gland functioning for hyperthyroidism and hypothyroidism.",
    clinicalImportance: "Critical for investigating fatigue, unexplained weight fluctuation, menstrual irregularity, and metabolic sluggishness.",
    preparation: "Overnight fasting (10-12 hours) recommended. Early morning sample.",
    reportTurnaround: "Same day evening",
    price: 550,
    isPopular: true,
    sampleType: "Blood (Serum)",
  },
  {
    id: "blood-sugar-fbs-ppbs",
    name: "Blood Glucose (Fasting & PP)",
    slug: "blood-glucose-test-silchar",
    category: "Pathology",
    shortDescription: "Accurate blood sugar evaluation for screening and monitoring diabetes mellitus.",
    clinicalImportance: "Measures plasma glucose levels in fasting state and 2 hours after a standard meal.",
    preparation: "FBS: 8-10 hours overnight fasting. PPBS: Exactly 2 hours post-meal.",
    reportTurnaround: "Same day (within 2 hours)",
    price: 150,
    isPopular: true,
    sampleType: "Blood (Fluoride)",
  },
  {
    id: "hba1c-glycated-hemoglobin",
    name: "HbA1c (Glycated Haemoglobin)",
    slug: "hba1c-test-silchar",
    category: "Pathology",
    shortDescription: "Gold-standard test reflecting average blood sugar control over the past 3 months.",
    clinicalImportance: "Invaluable for diabetes diagnosis, treatment titration, and cardiovascular risk reduction.",
    preparation: "No fasting required. Can be taken at any time of day.",
    reportTurnaround: "Same day evening",
    price: 450,
    isPopular: true,
    sampleType: "Blood (EDTA)",
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile (Cholesterol & Triglycerides)",
    slug: "lipid-profile-test-silchar",
    category: "Pathology",
    shortDescription: "Measures good (HDL) and bad (LDL) cholesterol to evaluate cardiovascular and heart health.",
    clinicalImportance: "Screens for atherosclerotic heart disease, hypercholesterolaemia, and stroke risks.",
    preparation: "Strict overnight fasting for 10-12 hours. Plain water is permitted.",
    reportTurnaround: "Same day evening",
    price: 600,
    isPopular: true,
    sampleType: "Blood (Serum)",
  },
  {
    id: "liver-function-test-lft",
    name: "Liver Function Test (LFT)",
    slug: "liver-function-test-lft-silchar",
    category: "Pathology",
    shortDescription: "Evaluates liver enzymes (SGOT, SGPT, ALP), total bilirubin, and proteins.",
    clinicalImportance: "Screens for hepatitis, jaundice, fatty liver, and drug-induced liver injuries.",
    preparation: "Overnight fasting (8-10 hours) recommended.",
    reportTurnaround: "Same day evening",
    price: 750,
    isPopular: true,
    sampleType: "Blood (Serum)",
  },
  {
    id: "kidney-function-test-kft",
    name: "Kidney Function Test (KFT / RFT)",
    slug: "kidney-function-test-kft-silchar",
    category: "Pathology",
    shortDescription: "Assesses renal performance measuring serum creatinine, blood urea nitrogen, and uric acid.",
    clinicalImportance: "Detects impaired renal filtration, kidney stones, and medication clearance problems.",
    preparation: "Overnight fasting (8 hours) advised. Avoid heavy meat intake the previous night.",
    reportTurnaround: "Same day evening",
    price: 750,
    isPopular: true,
    sampleType: "Blood (Serum)",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3 (25-Hydroxy)",
    slug: "vitamin-d3-test-silchar",
    category: "Pathology",
    shortDescription: "Measures circulating vitamin D levels essential for bone density, immunity, and calcium absorption.",
    clinicalImportance: "Investigates chronic joint pain, fatigue, osteoporosis, and recurrent infections.",
    preparation: "No special fasting required.",
    reportTurnaround: "Next day",
    price: 1200,
    sampleType: "Blood (Serum)",
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12 Assay",
    slug: "vitamin-b12-test-silchar",
    category: "Pathology",
    shortDescription: "Measures active B12 levels crucial for red blood cell synthesis and neurological nerve function.",
    clinicalImportance: "Explains peripheral tingling, nerve pain, memory fog, and megaloblastic anaemia.",
    preparation: "Overnight fasting (8 hours) recommended.",
    reportTurnaround: "Next day",
    price: 900,
    sampleType: "Blood (Serum)",
  },
  {
    id: "urine-re",
    name: "Urine Routine & Microscopic (Urine R/E)",
    slug: "urine-routine-examination-silchar",
    category: "Pathology",
    shortDescription: "Screens for urinary tract infections (UTI), proteinuria, pus cells, and renal calculi.",
    clinicalImportance: "Quick diagnostic tool for burning urination, kidney stones, and systemic metabolic issues.",
    preparation: "Clean-catch, midstream urine sample in a sterile container provided by centre.",
    reportTurnaround: "Within 2 to 3 hours",
    price: 150,
    sampleType: "Urine",
  },

  // --- Imaging (USG & X-Ray) ---
  {
    id: "usg-whole-abdomen",
    name: "Ultrasound Whole Abdomen & Pelvis (USG)",
    slug: "ultrasound-whole-abdomen-silchar",
    category: "Imaging",
    shortDescription: "High-resolution sonography scanning liver, gall bladder, kidneys, spleen, pancreas, and pelvic organs.",
    clinicalImportance: "Accurately detects gallstones, kidney stones, fatty liver, appendicitis, and pelvic masses.",
    preparation: "Overnight or 4-6 hours fasting for upper abdomen; full urinary bladder required for pelvis.",
    reportTurnaround: "Same day (within 1 to 2 hours of scan)",
    price: 1400,
    isPopular: true,
    sampleType: "Non-invasive Scan",
  },
  {
    id: "digital-xray-chest",
    name: "Digital X-Ray (Chest PA View)",
    slug: "digital-x-ray-chest-silchar",
    category: "Imaging",
    shortDescription: "Low-radiation digital radiography for lungs, bronchial airways, cardiac shadow, and ribs.",
    clinicalImportance: "Identifies pneumonia, pulmonary tuberculosis, chest congestion, and cardiomegaly.",
    preparation: "Remove metallic objects, necklaces, and metal-pinned clothing before scanning.",
    reportTurnaround: "Same day (within 30 to 45 minutes)",
    price: 400,
    isPopular: true,
    sampleType: "Digital Radiography",
  },

  // --- Cardiac ---
  {
    id: "ecg-12-lead",
    name: "12-Lead Electrocardiogram (ECG)",
    slug: "ecg-test-silchar",
    category: "Cardiac",
    shortDescription: "Records electrical activity of the heart to check rhythm, rate, and ischemia.",
    clinicalImportance: "First-line investigation for chest pain, palpitations, shortness of breath, and arrhythmias.",
    preparation: "No fasting required. Avoid strenuous exercise immediately prior to the test.",
    reportTurnaround: "Immediate (within 15 minutes with physician interpretation)",
    price: 250,
    isPopular: true,
    sampleType: "Non-invasive Cardiac Lead",
  },

  // --- Endoscopy ---
  {
    id: "ugi-endoscopy",
    name: "Upper GI Endoscopy (Gastroscopy)",
    slug: "upper-gi-endoscopy-silchar",
    category: "Endoscopy",
    shortDescription: "Visual examination of oesophagus, stomach, and duodenum using a high-definition video endoscope.",
    clinicalImportance: "Diagnoses peptic ulcers, acid reflux (GERD), gastritis, H. pylori, and unexplained upper abdominal pain.",
    preparation: "Strict 8-hour overnight fasting. No liquids or food on the morning of procedure.",
    reportTurnaround: "Same day (detailed photographic report post-procedure)",
    price: 2500,
    sampleType: "Endoscopic Visualisation",
  },
];

export const TEST_CATEGORIES: { label: string; value: TestCategory | "All" }[] = [
  { label: "All Diagnostic Tests", value: "All" },
  { label: "Pathology & Blood", value: "Pathology" },
  { label: "Ultrasound & X-Ray", value: "Imaging" },
  { label: "Cardiac / ECG", value: "Cardiac" },
  { label: "Endoscopy", value: "Endoscopy" },
];

export function getTestBySlug(slug: string): MedicalTest | undefined {
  return TESTS.find((t) => t.slug === slug);
}

export function getTestsByCategory(category: TestCategory): MedicalTest[] {
  return TESTS.filter((t) => t.category === category);
}

