import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import ActivityChart from "../ui/activity-chart";

import {
  InformationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faDownload } from "@fortawesome/free-solid-svg-icons";

import { getUser, getVisits } from "@/lib/api";

const MemberProfile = async ({}) => {
  const user = await getUser();
  const visits = await getVisits();

  const { firstName, lastName, email, eligibility } = user;

  // maps data to determine how many visits per month, then return a new array of objects with month and visits
  const visitsPerMonth = visits
    .map((item: any) => {
      const date = new Date(item.date);
      const month = date.toLocaleString("default", { month: "long" });
      return { month, visits: 1 };
    })
    .reduce((acc: any, curr: any) => {
      const found: any = acc.find((item: any) => item.month === curr.month);
      if (found) {
        found.visits += curr.visits;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

  const memberCardNumber = user.eligibility.cardNumber.replace(
    /(.{4})\B/g,
    "$1-",
  );

  return (
    <div className="container m-auto my-12 grid grid-cols-1 justify-evenly gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        {/* Profile Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
            <h4>
              {firstName} {lastName}
            </h4>
            <CardDescription className="flex items-center gap-2">
              <InformationCircleIcon className="h-4 w-4" />
              <p>Change your name with your health plan provider</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              <span className="font-extrabold">Email:</span>
              <span className="truncate text-ellipsis font-light ">
                {email.address}
              </span>
              <Button variant="link">Edit</Button>
            </div>
            <div className="flex items-center gap-2">
              <LockClosedIcon className="h-5 w-5" />
              <span className="font-extrabold">Password:</span>
              <span className="relative top-1">********************</span>
              <Button variant="link">Edit</Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="gap-2">
              <ArrowRightIcon className="h-5 w-5" />
              <span>Log Off</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="flex flex-col gap-8">
          {/* Member ID Card */}
          <Card className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <CardHeader>
                <CardTitle>Member ID</CardTitle>
                <span className="space-x-1 text-lg tracking-wider">
                  <span>#</span>
                  <span>{memberCardNumber}</span>
                </span>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="md:max-w-sm">
                  Your member ID gets you into thousands of fitness locations
                  and classes. Just download or print your member ID and share
                  it at your favorite location.
                </p>
              </CardContent>

              {/* TODO: write the Print and Download functions */}
              <CardFooter className="flex gap-4">
                <Button
                  variant="secondaryWhite"
                  size="lg"
                  className="space-x-2"
                >
                  <FontAwesomeIcon icon={faPrint} className="h-5 w-5" />
                  <span>Print</span>
                </Button>
                <Button
                  variant="secondaryWhite"
                  size="lg"
                  className="space-x-2"
                >
                  <FontAwesomeIcon icon={faDownload} className="h-5 w-5" />
                  <span>Download</span>
                </Button>
              </CardFooter>
            </div>
            <div className="max-md:mt-5">
              <Image
                src={eligibility.cardImageUrl}
                width={400}
                height={288}
                alt="Your SilverSneakers Member Card"
                className="rounded-lg border shadow-lg"
              />
            </div>
          </Card>

          {/* Activity Tracker Card */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Tracker</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <InformationCircleIcon className="h-4 w-4" />
                <p>
                  There may be up to a 2 month delay in displaying your activity
                  history
                </p>
              </CardDescription>
            </CardHeader>
            <div className="mt-6 rounded-md bg-gray-100 p-6">
              <CardContent>
                <ActivityChart data={visitsPerMonth} />
              </CardContent>
              <CardFooter className="flex flex-col items-start text-sm">
                <p>Here are some ways to keep moving:</p>
                <ul className="ml-2 mt-2 list-inside list-disc">
                  <li>
                    <Link href="/participating-locations">
                      Find a place to work out in person
                    </Link>
                  </li>
                  <li>
                    <Link href="/live-class-schedule">
                      Attend a LIVE online class
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Log a workout with the SilverSneakers GO app
                    </Link>
                  </li>
                </ul>
              </CardFooter>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

registerUniformComponent({
  type: "memberProfile",
  component: MemberProfile as any,
});

export default MemberProfile;
