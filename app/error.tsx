"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/primitives/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 text-danger">
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
