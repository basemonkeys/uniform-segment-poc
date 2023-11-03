/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export function GlobalHeader({ Header, MemberHeader }: any) {
  const { user } = useUser();
  return user ? MemberHeader : Header;
}
