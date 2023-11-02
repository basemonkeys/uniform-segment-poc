"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";

import {
  InformationCircleIcon,
  // ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import { getUser } from "@/utils/api";

export async function ProfileInfoCard(props: { user: Types.UserProps }) {
  const { data } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: props.user,
  });

  const { firstName, lastName, email } = data;

  return (
    <Card className="lg:h-[294px] lg:max-h-[294px]">
      <div className="flex h-full flex-col gap-6">
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
        <CardContent className="mt-auto pt-2">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5" />
            <span className="font-extrabold">Email:</span>
            <span className="truncate text-ellipsis font-light ">
              {email.address}
            </span>
            <Button variant="link" className="ml-auto p-0">
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5" />
            <span className="font-extrabold">Password:</span>
            <span className="relative top-1">*************</span>
            <Button variant="link" className="ml-auto p-0">
              Edit
            </Button>
          </div>
        </CardContent>
        {/* <CardFooter>
        <Button variant="link" className="gap-2">
          <ArrowRightIcon className="h-5 w-5" />
          <span>Log Off</span>
        </Button>
      </CardFooter> */}
      </div>
    </Card>
  );
}
