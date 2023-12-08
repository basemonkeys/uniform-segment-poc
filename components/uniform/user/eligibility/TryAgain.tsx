/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import { Separator } from "@/components/primitives/separator";

import { Button } from "@/components/primitives/button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export function EligibilityTryAgain() {
  return (
    <div className="prose my-12 flex max-w-full flex-col">
      <h3>We couldn't find you, but you still might be eligible!</h3>
      <Separator
        orientation="horizontal"
        className="mb-6 w-24 border-2 border-orange-500 sm:max-w-[100px]"
      />
      <h4>Why your eligibility check might fail</h4>
      <ul className="mb-6 w-full">
        <li>
          The name you provided is different that the one your health plan has
          on file
        </li>
        <li>
          The zip code you provided is different than the one your health plan
          has on file
        </li>
        <li>You have a new health plan, but the coverage hasn't started yet</li>
        <li>Your health plan doesn't include SilverSneakers</li>
      </ul>

      <h4>Does the following information match your health plan?</h4>
      <div className="mb-6 flex items-center gap-4">
        <span>
          <span className="font-semibold">Name:</span> Mariel Smith
        </span>
        <span>
          <span className="font-semibold">Zip Code:</span> 83521
        </span>
        <span>
          <span className="font-semibold">Date of Birth:</span> 7/15/1951
        </span>
      </div>

      <div className="mb-6 flex gap-4">
        <Button>Edit My Info</Button>
        <Button variant="secondaryWhite">My Info Is Correct</Button>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">Have any questions?</span>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
            <Link href="mailto:">Contact Us</Link>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="h-3 w-3" />
              <Link href="mailto:">866-584-7389</Link>
            </div>
            <span className="ml-5 text-sm">
              Monday through Friday, 8am - 8pm EST
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
