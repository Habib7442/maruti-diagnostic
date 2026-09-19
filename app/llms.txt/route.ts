import { CENTRE_INFO } from "@/data/centre";
import { DOCTORS } from "@/data/doctors";
import { TESTS } from "@/data/tests";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const { name, formattedAddress, phones, whatsapp, hoursDetail, verified } =
    CENTRE_INFO;

  const lines = [
    `# ${name}`,
    "",
    `> ${name} is a diagnostic centre and daily doctor chamber in Silchar, Assam. It offers pathology, digital X-ray, ultrasound (USG), ECG and upper GI endoscopy, and hosts ${DOCTORS.length} medical specialists. Located opposite SMCH, behind Maruti Medical, Ghungoor.`,
    "",
    "## Contact",
    `- Address: ${formattedAddress}`,
    `- Phone: ${phones.displayPrimary}, ${phones.displaySecondary}`,
    `- WhatsApp: ${whatsapp.display}`,
    ...(verified.hours
      ? [`- Hours: ${hoursDetail.weekday}; ${hoursDetail.sunday}`]
      : []),
    `- Website: ${absoluteUrl("/")}`,
    "",
    "## Doctors",
    ...DOCTORS.map((d) => {
      const when =
        d.type === "daily" ? `chamber ${d.chamberTiming}` : "by appointment";
      return `- [${d.name}](${absoluteUrl(`/doctors/${d.slug}`)}): ${d.specialty}, ${when}`;
    }),
    "",
    "## Tests",
    ...TESTS.map(
      (t) =>
        `- [${t.name}](${absoluteUrl(`/tests/${t.slug}`)}): ${t.category}, report ${t.reportTurnaround}`
    ),
    "",
    "## Pages",
    `- [Doctors](${absoluteUrl("/doctors")})`,
    `- [Tests](${absoluteUrl("/tests")})`,
    `- [About](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    `- [Book an appointment or test](${absoluteUrl("/booking")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
