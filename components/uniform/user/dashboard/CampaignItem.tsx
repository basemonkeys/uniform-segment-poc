/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType } from "react";
import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";
import Image from "next/image";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { getImageUrl } from "@/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";

export enum CampaignType {
  AppleFitnessPlus = "Apple Fitness+",
  GetSetUp = "GetSetUp",
  Stitch = "Stitch",
}

const CampaignTypeToComponent: Record<
  string,
  ElementType<CampaignItemProps>
> = {
  [CampaignType.AppleFitnessPlus.toString()]: AppleFitnessPlusCampaignitem,
  [CampaignType.GetSetUp.toString()]: GetSetUpCampaignitem,
};

type CampaignItemProps = ComponentProps<{
  title: string;
  description: any;
  campaignType: CampaignType;
  callToAction: string;
  callToActionUrl: string;
  image?: string;
  logo?: string;
}>;

function AppleFitnessPlusCampaignitem({
  title,
  description,
  callToAction,
  callToActionUrl,
  image,
  logo,
}: CampaignItemProps) {
  return (
    <Card key={title} className="flex flex-col gap-6 sm:flex-row">
      <div className="w-full md:max-w-[250px]">
        <Image
          width={250}
          height={250}
          sizes="100vw"
          src={getImageUrl(image)}
          alt="Campaign Image"
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        {logo && (
          <div className="relative w-[196px] pb-1">
            <Image
              width={196}
              height={196}
              src={getImageUrl(logo)}
              alt="Campaign Logo"
              className="object-contain"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="h3 p-0">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {documentToReactComponents(description)}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button size="xl" asChild>
            <Link href={callToActionUrl}>{callToAction}</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

function GetSetUpCampaignitem({
  title,
  description,
  callToAction,
  callToActionUrl,
  image,
  logo,
}: CampaignItemProps) {
  return (
    <Card key={title} className="flex flex-col gap-6 sm:flex-row">
      <div className="w-full md:max-w-[250px]">
        <Image
          width={250}
          height={250}
          sizes="100vw"
          src={getImageUrl(image)}
          alt="Campaign Image"
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        {logo && (
          <div className="relative w-[196px] pb-1">
            <Image
              width={196}
              height={196}
              src={getImageUrl(logo)}
              alt="Campaign Logo"
              className="object-contain"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="h3 p-0">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {documentToReactComponents(description)}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button size="xl" asChild>
            <Link href={callToActionUrl}>{callToAction}</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

function DefaultCampaignItem({
  title,
  description,
  callToAction,
  callToActionUrl,
  image,
  logo,
}: CampaignItemProps) {
  return (
    <Card key={title} className="flex flex-col gap-6 sm:flex-row">
      <div className="w-full md:max-w-[250px]">
        <Image
          width={250}
          height={250}
          sizes="100vw"
          src={getImageUrl(image)}
          alt="Campaign Image"
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        {logo && (
          <div className="relative w-[196px] pb-1">
            <Image
              width={196}
              height={196}
              src={getImageUrl(logo)}
              alt="Campaign Logo"
              className="object-contain"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="h3 p-0">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {documentToReactComponents(description)}
        </CardContent>
        <CardFooter className="mt-auto">
          <Button size="xl" asChild>
            <Link href={callToActionUrl}>{callToAction}</Link>
            {/* TODO: if href is internal do this, or do this */}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export function CampaignItem(props: CampaignItemProps) {
  const { campaignType } = props;

  const Component =
    CampaignTypeToComponent[campaignType] || DefaultCampaignItem;
  return <Component {...props} />;
}

registerUniformComponent({
  type: "campaignItem",
  component: CampaignItem,
});
