import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-fit flex-col items-center justify-center space-y-3 p-12 text-center">
      <h2>Page Not found</h2>
      <h3>(Maybe it went to the gym 😁)</h3>
      <p className="text-gray-700">
        Please accept our apologies, but this page is unavailable.
      </p>
      <p className="max-w-sm pt-12 text-gray-700">
        Try navigating to a different page or jump directly to one of our
        popular destinations below.
      </p>
      <div className="flex flex-col">
        <Link href="/login">Log In</Link>
        <Link href="/check-eligibility">Check Eligibility</Link>
        <Link href="/classes/live-class-schedule">LIVE Online Clases</Link>
        <Link href="/participating-locations">Fitness Locations</Link>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
