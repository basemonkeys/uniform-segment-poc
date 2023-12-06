/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType } from "react";
import { type ComponentProps } from "@uniformdev/canvas-next-rsc/component";

import Link from "next/link";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { CloudinaryImage } from "@/components/client-components/Cloudinary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

export enum CampaignType {
  AppleFitnessPlus = "Apple Fitness+",
}

const CampaignTypeToComponent: Record<
  string,
  ElementType<CampaignItemProps>
> = {
  [CampaignType.AppleFitnessPlus.toString()]: AppleFitnessPlusCampaignitem,
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
      {image && (
        <div className="w-full md:max-w-[250px]">
          <CloudinaryImage
            width={250}
            height={250}
            sizes="100vw"
            src={image}
            alt="Campaign Image"
            className="h-auto w-full object-contain"
          />
        </div>
      )}
      <div className="flex flex-col">
        {logo && (
          <div className="relative w-[196px] pb-1">
            <CloudinaryImage
              src={logo}
              width={196}
              height={196}
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
          <Button asChild>
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
      {image && (
        <div className="w-full md:max-w-[250px]">
          <CloudinaryImage
            width={250}
            height={250}
            sizes="100vw"
            src={image}
            alt="Campaign Image"
            className="h-auto w-full object-contain"
          />
        </div>
      )}
      <div className="flex flex-col">
        {logo && (
          <div className="relative w-[196px] pb-1">
            <CloudinaryImage
              src={logo}
              width={196}
              height={196}
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
          <Button asChild>
            <Link href={callToActionUrl} className="flex items-center gap-2">
              <span>{callToAction}</span>
              {callToActionUrl.includes("partner=") && (
                <FontAwesomeIcon icon={faExternalLink} className="h-3 w-3" />
              )}
            </Link>
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
