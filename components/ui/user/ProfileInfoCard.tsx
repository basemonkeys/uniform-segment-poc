"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  InformationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import { getUser } from "@/utils/api";

export async function ProfileInfoCard(props: { user: Types.UserProps }) {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: props.user,
  });

  const { firstName, lastName, email } = data;

  // console.log(data, isLoading, isFetching, error);

  return (
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
  );
}
