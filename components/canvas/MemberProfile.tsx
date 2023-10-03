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

const user = {
  firstName: "Silversneakers",
  lastName: "Demo",
  middleInitial: null,
  nickname: "SilverSneakers Demo",
  gender: "Male",
  zipCode: "85225",
  dateOfBirth: "1990-01-01T00:00:00",
  accountCreationDate: "2016-08-31T18:05:01.063",
  eligibility: {
    hasSilverSneakers: true,
    cardNumber: "2300103854957548",
    cardImageUrl:
      "https://devapi.silversneakers.com/member-cards?a=Ktzzvk9H8zkTZaE5Zq%2BMBmR9nO4SWXweJNrN4btm567I4fjpvrIG7%2FWTnb0FYALn2ubPiogDgCk9yQ6TjPSykjmmM0wP2mjI%2FjTll58vr2wnBv8DGgt2VYJYRqpjsw2sajLfIeKf5vsKT2EpfPqVZRyzDymqe20K%2Bfe%2BXqPEjMc%3D&b=0d2fdbbfcb824ce31ad42144773b939025aa797826dc1d5365b9b9a7f8038df5",
    benefitProviderId: "2018",
    startDate: "2016-05-01T00:00:00",
    endDate: "9999-12-31T23:59:00",
    eligibilityId: "63872871",
    costCenter: "2018",
    SubscriberId: null,
    Source: "MANUAL INSERT",
    DependentId: null,
    ActiveMemberTier: {
      HwEligibilityId: 115805762,
      ProgramCode: "ssf_mnpremium",
      Tier: 2,
      TierEndDate: "9999-12-31T00:00:00",
      TierLpdDate: "9999-12-31T00:00:00",
      TierStartDate: "2023-01-01T00:00:00",
    },
  },
  email: {
    address: "silversneakersdemo@gmail.com",
    verified: false,
  },
  phone: {
    number: null,
    numberToVerify: null,
    verified: false,
  },
  credentials: {
    lastPasswordChangeDate: "2021-12-17T17:51:11.383",
    lastLoginDate: "2023-07-20T17:53:19",
    remainingLockoutMinutes: null,
    remainingLoginAttempts: 5,
  },
  stepsKitBenefit: {
    hasBenefit: true,
    orderLimitReached: false,
    ordersHistory: [
      {
        kit: "Walking",
        orderDate: "2018-04-20T13:39:45.413",
        orderStatus: "Complete",
        address1: "1234 Test Address",
        address2: null,
        city: "Phoenix",
        state: "AZ",
        zip: "85225",
      },
      {
        kit: "Walking",
        orderDate: "2019-02-27T10:47:00.753",
        orderStatus: "Complete",
        address1: "2152 W. Fantero",
        address2: null,
        city: "Escondido",
        state: "CA",
        zip: "92025",
      },
    ],
  },
  campaigns: [
    {
      Participated: true,
      CampaignType: "MpcCampaign",
      Eligible: true,
      MaxBookings: null,
      GoalWeightLoss: 1,
      GoalAcheived: false,
      CurrentWeightLost: 0,
    },
    {
      Participated: false,
      CampaignType: "StitchConnect",
      Eligible: true,
      MaxBookings: null,
    },
    {
      Participated: false,
      CampaignType: "stitch",
      Eligible: true,
      MaxBookings: null,
    },
    {
      Participated: false,
      CampaignType: "mb",
      Eligible: true,
      MaxBookings: "4",
    },
    {
      Participated: false,
      CampaignType: "gsu",
      Eligible: true,
      MaxBookings: null,
    },
    {
      Participated: false,
      CampaignType: "af",
      Eligible: true,
      MaxBookings: null,
    },
  ],
  EngagementColor: null,
  EngagementContact: 1,
  workoutPreference: "Solo",
};

// TODO: fetch api data on the server
const visits = [
  {
    month: "April",
    visits: 50,
  },
  {
    month: "May",
    visits: 38,
  },
  {
    month: "June",
    visits: 25,
  },
  {
    month: "July",
    visits: 20,
  },
  {
    month: "August",
    visits: 24,
  },
  {
    month: "Sept",
    visits: 10,
  },
];

const data = [
  {
    date: "2023-10-03T05:20:04.591Z",
    isFlex: true,
    locationId: "001",
    locationName: "Arizona",
  },
  {
    date: "2023-09-022T05:20:04.591Z",
    isFlex: true,
    locationId: "002",
    locationName: "New Mexico",
  },
  {
    date: "2023-08-16T05:20:04.591Z",
    isFlex: true,
    locationId: "003",
    locationName: "Colorado",
  },
];

const MemberProfile = () => {
  const { firstName, lastName, email, eligibility } = user;

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
                  {/* add a dash every four numbers in cardNumber */}
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
                <ActivityChart data={visits} />
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
  component: MemberProfile,
});

export default MemberProfile;
