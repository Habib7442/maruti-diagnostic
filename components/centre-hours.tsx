import { CENTRE_INFO } from "@/data/centre";

/** Centre hours from data/centre.ts. If they are ever marked unconfirmed, visitors are asked to call. */
export function CentreHours({ className = "" }: { className?: string }) {
  const { verified, hoursDetail, phones } = CENTRE_INFO;

  if (!verified.hours) {
    return (
      <p className={className}>
        Call{" "}
        <a href={`tel:${phones.primary}`} className="font-medium underline underline-offset-2">
          {phones.displayPrimary}
        </a>{" "}
        to confirm today&apos;s timings.
      </p>
    );
  }

  return (
    <div className={className}>
      <p>{hoursDetail.weekday}</p>
      <p>{hoursDetail.sunday}</p>
    </div>
  );
}
