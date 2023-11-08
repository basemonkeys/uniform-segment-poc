"use client";

import { UniformRichText } from "@uniformdev/canvas-next-rsc";

import Link from "next/link";

import { useAtomValue } from "jotai";

import { cn } from "@/utils";
import { gridCardCountAtom, lastGridItemIdAtom } from "@/utils/uiState";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";

import { CloudinaryImage } from "@/components/client-components/Cloudinary";

import { type LinkCardProps } from "@/components/uniform/navigation/LinkCard";

export function LinkCard({
  title,
  cta,
  ctaLink,
  image,
  component,
}: LinkCardProps) {
  const gridCardCount = useAtomValue(gridCardCountAtom);
  const lastGridItemId = useAtomValue(lastGridItemIdAtom);

  const isLastGridItem = gridCardCount == 3 && lastGridItemId === component._id;

  return (
    <Card
      className={cn(
        "relative flex justify-between gap-4",
        isLastGridItem && "md:col-span-2",
      )}
    >
      <div className="z-10 max-w-md">
        <CardHeader>
          <CardTitle className="h3">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <UniformRichText
            parameterId="description"
            component={component}
            className="text-sm"
          />
        </CardContent>
        <CardFooter>
          <Button variant="secondaryWhite" asChild>
            <Link href={ctaLink.path}>{cta}</Link>
          </Button>
        </CardFooter>
      </div>
      <div className="absolute bottom-0 right-0 z-0">
        <CloudinaryImage
          src={image[0].publicId}
          alt="Loading"
          width={125}
          height={100}
        />
      </div>
    </Card>
  );
}
