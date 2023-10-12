import Link from "next/link";

import ActivityChart from "@/components/ui/user/ActivityChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InformationCircleIcon } from "@heroicons/react/20/solid";

import { getVisits } from "@/utils/api";

export async function ActivityTrackerCard() {
  const visits = getVisits();

  // maps data to determine how many visits per month, then return a new array of objects with month and visits
  const visitsPerMonth = (await visits)
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

  return (
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
              <Link href="#">Log a workout with the SilverSneakers GO app</Link>
            </li>
          </ul>
        </CardFooter>
      </div>
    </Card>
  );
}
