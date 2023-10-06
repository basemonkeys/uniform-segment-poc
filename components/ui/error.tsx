"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Error() {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="h3">Unable to load information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">Oops. Something happened. Please try again.</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="gap-2" onClick={refreshPage}>
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
}
