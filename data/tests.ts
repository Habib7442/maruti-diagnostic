export type TestCategory = "Pathology" | "Imaging" | "Cardiac" | "Endoscopy" | "Neurology";

export interface MedicalTest {
  id: string;
  name: string;
  slug: string;
  category: TestCategory;
  shortDescription: string;
  clinicalImportance: string;
  preparation: string;
  reportTurnaround: string;
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
    isPopular: true,
    sampleType: "Digital Radiography",
  },
  {
    id: "color-doppler",
    name: "Color Doppler Ultrasound",
    slug: "color-doppler-test-silchar",
    category: "Imaging",
    shortDescription: "An ultrasound scan that shows blood flow through arteries and veins in the neck, arms, legs, abdomen or a pregnancy.",
    clinicalImportance: "Doctors advise a Doppler scan to look for blocked or narrowed blood vessels, clots in leg veins (DVT), varicose veins, poor circulation, and to check blood flow to the baby in pregnancy.",
    preparation: "Depends on the area being scanned. For an abdominal Doppler, do not eat for 6 hours before the scan. For neck, arm, leg or pregnancy Doppler, no fasting is needed. Wear loose clothing and bring your doctor's prescription.",
    reportTurnaround: "Call to confirm report time",
    sampleType: "Non-invasive Scan",
  },
  {
    id: "anomaly-scan",
    name: "Anomaly Scan (Pregnancy Ultrasound)",
    slug: "anomaly-scan-silchar",
    category: "Imaging",
    shortDescription: "A detailed pregnancy ultrasound, usually done between 18 and 22 weeks, to check how the baby is developing.",
    clinicalImportance: "The anomaly scan checks the baby's head, brain, spine, heart, face, kidneys and limbs, the position of the placenta and the amount of fluid. It helps your gynaecologist pick up problems early and plan care. As required by the PCPNDT Act, the sex of the baby is not disclosed.",
    preparation: "No fasting is needed. Book the scan in the week your gynaecologist advises, usually between 18 and 22 weeks. Bring your doctor's prescription, earlier scan reports and a photo ID.",
    reportTurnaround: "Call to confirm report time",
    sampleType: "Non-invasive Scan",
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
    sampleType: "Endoscopic Visualisation",
  },

  // --- Neurology ---
  {
    id: "eeg",
    name: "EEG (Electroencephalogram)",
    slug: "eeg-test-silchar",
    category: "Neurology",
    shortDescription: "A painless test that records the brain's electrical activity using small sensors placed on the scalp.",
    clinicalImportance: "Doctors advise an EEG to look for seizures (fits) and epilepsy, unexplained fainting or blackouts, and some sleep, memory and behaviour problems.",
    preparation: "Wash your hair the night before or on the morning of the test, and do not use oil, gel or spray. Eat normally and keep taking your medicines unless your doctor says otherwise. Your doctor may ask you to sleep less the night before.",
    reportTurnaround: "Call to confirm report time",
    sampleType: "Non-invasive Recording",
  },
  {
    id: "ncv",
    name: "NCV (Nerve Conduction Study)",
    slug: "ncv-test-silchar",
    category: "Neurology",
    shortDescription: "Measures how fast and how strongly signals travel along the nerves of the arms and legs.",
    clinicalImportance: "Doctors advise an NCV test for numbness, tingling, burning or weakness in the hands or feet, carpal tunnel syndrome, diabetic nerve damage (neuropathy) and nerve injuries.",
    preparation: "Bathe before the test and do not apply oil, cream or lotion on your arms and legs. Wear loose clothing. Tell the staff if you have a pacemaker. Keep taking your usual medicines.",
    reportTurnaround: "Call to confirm report time",
    sampleType: "Non-invasive Recording",
  },
];

export const TEST_CATEGORIES: { label: string; value: TestCategory | "All" }[] = [
  { label: "All tests", value: "All" },
  { label: "Blood and urine", value: "Pathology" },
  { label: "Ultrasound, Doppler and X-ray", value: "Imaging" },
  { label: "ECG", value: "Cardiac" },
  { label: "EEG and NCV", value: "Neurology" },
  { label: "Endoscopy", value: "Endoscopy" },
];

export function getTestBySlug(slug: string): MedicalTest | undefined {
  return TESTS.find((t) => t.slug === slug);
}

export function getAllTestSlugs(): string[] {
  return TESTS.map((t) => t.slug);
}

export function getTestsByCategory(category: TestCategory): MedicalTest[] {
  return TESTS.filter((t) => t.category === category);
}

export function getRelatedTests(
  currentTestId: string,
  category: TestCategory,
  limit: number = 3
): MedicalTest[] {
  const sameCategory = TESTS.filter(
    (t) => t.id !== currentTestId && t.category === category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = TESTS.filter(
    (t) => t.id !== currentTestId && t.category !== category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

