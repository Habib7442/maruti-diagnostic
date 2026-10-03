import { CENTRE_INFO } from "@/data/centre";
import { DOCTORS } from "@/data/doctors";
import type { Doctor } from "@/data/doctors";
import type { MedicalTest } from "@/data/tests";

export interface Faq {
  question: string;
  answer: string;
}

const { phones, formattedAddress, name: CENTRE } = CENTRE_INFO;
const WHERE = `${CENTRE} is at ${formattedAddress}. It is opposite SMCH, behind Maruti Medical.`;
const CALL = `Call ${phones.displayPrimary} or ${phones.displaySecondary}, message us on WhatsApp, or send an enquiry from the booking page.`;

const hoursAnswer = `${CENTRE_INFO.hoursDetail.weekday}. ${CENTRE_INFO.hoursDetail.sunday}. Doctor chamber timings vary by specialist.`;

function hoursFaq(): Faq[] {
  return CENTRE_INFO.verified.hours
    ? [{ question: `What are the opening hours of ${CENTRE}?`, answer: hoursAnswer }]
    : [];
}

export function getHomeFaqs(): Faq[] {
  const daily = DOCTORS.filter((d) => d.type === "daily").length;
  const visiting = DOCTORS.length - daily;

  return [
    {
      question: `Where is ${CENTRE} in Silchar?`,
      answer: WHERE,
    },
    {
      question: `Which tests can I get done at ${CENTRE}?`,
      answer:
        "Blood and urine tests (pathology), digital X-ray, ultrasound (USG), ECG and upper GI endoscopy. Open the Tests page to see each test with preparation and report time.",
    },
    {
      question: `How many doctors consult at ${CENTRE}?`,
      answer: `${DOCTORS.length} specialists consult here: ${daily} in daily chamber and ${visiting} as associated doctors by appointment. Departments include Medicine, Gynaecology, ENT, Orthopaedics, Paediatrics, Dermatology, Surgery, Neurosurgery and Neuro-psychiatry.`,
    },
    {
      question: "How do I book a test or a doctor appointment?",
      answer: CALL,
    },
    ...hoursFaq(),
  ];
}

export function getContactFaqs(): Faq[] {
  return [
    {
      question: `How do I reach ${CENTRE} in Silchar?`,
      answer: `${WHERE} Use the map on this page for directions.`,
    },
    {
      question: `What is the phone number of ${CENTRE}?`,
      answer: `${phones.displayPrimary} and ${phones.displaySecondary}. You can also message us on WhatsApp.`,
    },
    ...hoursFaq(),
    {
      question: "Do I need an appointment to see a doctor?",
      answer:
        "You can reserve a slot in advance by calling or sending an enquiry. Tokens are also given at the reception counter each day. Visiting doctors see patients by appointment, so please call first.",
    },
  ];
}

export function getDoctorFaqs(doctor: Doctor): Faq[] {
  const faqs: Faq[] = [];

  if (doctor.type === "daily") {
    faqs.push({
      question: `What are ${doctor.name}'s chamber timings in Silchar?`,
      answer: `${doctor.name} has a daily chamber from ${doctor.chamberTiming} at ${CENTRE}, Ghungoor, opposite SMCH. Call ${phones.displayPrimary} to confirm the day before you visit.`,
    });
  } else {
    faqs.push({
      question: `When does ${doctor.name} see patients in Silchar?`,
      answer: `${doctor.name} is an associated doctor at ${CENTRE}, Ghungoor, and sees patients by appointment. Call ${phones.displayPrimary} to book a day and time.`,
    });
  }

  faqs.push({
    question: `Where does ${doctor.name} consult in Silchar?`,
    answer: WHERE,
  });

  if (doctor.fee) {
    faqs.push({
      question: `What is ${doctor.name}'s consultation fee?`,
      answer: `The consultation fee is ₹${doctor.fee}. Please confirm at reception before your visit.`,
    });
  }

  faqs.push({
    question: `How do I book an appointment with ${doctor.name}?`,
    answer: CALL,
  });

  faqs.push({
    question: `What are ${doctor.name}'s qualifications?`,
    answer: `${doctor.name}, ${doctor.specialty}, holds these qualifications: ${doctor.qualifications.join(", ")}.`,
  });

  if (doctor.conditionsTreated.length) {
    faqs.push({
      question: `What does ${doctor.name} treat?`,
      answer: `${doctor.name}, ${doctor.specialty}, sees patients for ${doctor.conditionsTreated.join(", ")}.`,
    });
  }

  return faqs;
}

export function getTestFaqs(test: MedicalTest): Faq[] {
  return [
    {
      question: `Do I need to fast before ${test.name}?`,
      answer: test.preparation,
    },
    {
      question: `How soon will I get my ${test.name} report?`,
      answer: `${test.reportTurnaround}.`,
    },
    {
      question: `How do I book ${test.name} in Silchar?`,
      answer: `Call ${phones.displayPrimary} or ${phones.displaySecondary} to book ${test.name} at ${CENTRE}. The centre is open ${CENTRE_INFO.hoursDetail.weekday.replace("Monday - Saturday: ", "Monday to Saturday, ")} and closed on Sunday.`,
    },
    {
      question: `Why is ${test.name} done?`,
      answer: test.clinicalImportance,
    },
    {
      question: `Where can I get ${test.name} done in Silchar?`,
      answer: WHERE,
    },
  ];
}
