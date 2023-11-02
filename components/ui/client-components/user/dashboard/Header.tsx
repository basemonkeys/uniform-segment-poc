/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

// import { cn } from "@/utils";

import { Button } from "@/components/ui/primitives/button";

export function Header() {
  const { user } = useUser();
  const firstName = user?.name?.split(" ")[0];

  console.log(user);
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row lg:gap-0">
      <div className="flex flex-col text-center md:text-left">
        <h2>Hello, {firstName}!</h2>
        <p>Here's what's happening right now</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="secondaryWhite" size="xl">
          Get Member ID
        </Button>
        <Link
          href="/classes/live-class-schedule"
          className="link text-right text-sm"
        >
          My RSVP'd classes (1)
        </Link>
      </div>
    </div>
  );
}
