"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniformRichText } from "@uniformdev/canvas-next-rsc";
import { useQuery } from "@tanstack/react-query";

import { getVisits } from "@/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import ActivityChart from "@/components/client-components/user/profile/ActivityChart";

import { InformationCircleIcon } from "@heroicons/react/20/solid";

import type { MemberActivityTrackerCardProps } from "@/components/uniform/user/profile/MemberActivityTrackerCard";

type BaseMemberActivityTrackerCardProps = MemberActivityTrackerCardProps & {
  visits: Types.VisitsApiProps;
};

export async function MemberActivityTrackerCard({
  title,
  description,
  component,
  visits,
}: BaseMemberActivityTrackerCardProps) {
  const { data } = useQuery({
    queryKey: ["visits"],
    queryFn: getVisits,
    initialData: visits,
  });

  // maps data to determine how many visits per month, then return a new array of objects with month and visits
  const visitsPerMonth = (await data)
    .map((item: Types.VisitsApiProps) => {
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
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <InformationCircleIcon className="h-4 w-4" />
          <p>{description}</p>
        </CardDescription>
      </CardHeader>
      <div className="mt-6 rounded-md bg-gray-100 p-6">
        <CardContent>
          <ActivityChart data={visitsPerMonth} />
        </CardContent>
        <CardFooter className="flex flex-col items-start text-sm">
          <div className="prose">
            <UniformRichText
              parameterId="content"
              component={component}
              className="text-sm"
            />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
