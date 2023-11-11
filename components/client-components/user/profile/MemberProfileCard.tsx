"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";

import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import { getUser } from "@/utils/api";

import type { MemberProfileCardProps } from "@/components/uniform/user/profile/MemberProfileCard";

type BaseMemberProfileCardProps = MemberProfileCardProps & {
  user: Types.UserApiProps;
};

export async function MemberProfileCard({
  title,
  description,
  user,
}: BaseMemberProfileCardProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: user,
  });

  const { firstName, lastName, email } = data;

  return (
    <Card className="lg:h-[294px] lg:max-h-[294px]">
      <div className="flex h-full flex-col gap-6">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <h4>
            {firstName} {lastName}
          </h4>
          <CardDescription className="flex items-center gap-2">
            <InformationCircleIcon className="h-4 w-4" />
            <p>{description}</p>
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
      </div>
    </Card>
  );
}
