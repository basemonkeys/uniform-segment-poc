// TODO: combine this with CampaignItem.tsx?
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType } from "react";
import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";
import Image from "next/image";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { cn } from "@/utils";
import { getImageUrl } from "@/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";

export enum CampaignType {
  GetSetUp = "GetSetUp",
}

const CampaignTypeToComponent: Record<
  string,
  ElementType<CampaignItemProps>
> = {
  [CampaignType.GetSetUp.toString()]: GetSetUpCampaignItem,
};

type CampaignItemProps = ComponentProps<{
  title?: string;
  description?: any;
  campaignType: CampaignType;
  imageOne: string;
  imageOneTitle: string;
  imageTwo: string;
  imageTwoTitle: string;
  imageThree: string;
  imageThreeTitle: string;
  cta: string;
  ctaLink: string;
  logo?: string;
}>;

function GetSetUpCampaignItem({
  title,
  description,
  imageOne,
  imageOneTitle,
  imageTwo,
  imageTwoTitle,
  imageThree,
  imageThreeTitle,
  cta,
  ctaLink,
  logo,
}: CampaignItemProps) {
  const hasHeader: boolean = title || description;

  return (
    <Card key={title} className="flex flex-col gap-6">
      {logo && (
        <Image
          width={196}
          height={196}
          src={getImageUrl(logo)}
          alt="Campaign Logo"
          className="object-contain"
        />
      )}
      {title || description ? (
        <CardHeader>
          {title && <CardTitle className="h3">{title}</CardTitle>}
          {description && documentToReactComponents(description)}
        </CardHeader>
      ) : null}
      <CardContent
        className={cn("flex flex-col gap-4 lg:flex-row", !hasHeader && "pt-0")}
      >
        <div className="flex gap-6">
          <div className="w-full md:max-w-[400px]">
            <Image
              width={400}
              height={256}
              src={getImageUrl(imageOne)}
              alt={`${imageOneTitle} Image`}
              className="object-contain"
            />
          </div>
          <div className="w-full md:max-w-[400px]">
            <Image
              width={400}
              height={256}
              src={getImageUrl(imageTwo)}
              alt={`${imageTwoTitle} Image`}
            />
          </div>
          <div className="w-full md:max-w-[400px]">
            <Image
              width={400}
              height={256}
              src={getImageUrl(imageThree)}
              alt={`${imageThreeTitle} Image`}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild>
          <Link href={ctaLink}>{cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// this component is currently the same as the GetSetUpCampaignItem component, but it is included here for future use
function DefaultCampaignItem({
  title,
  description,
  imageOne,
  imageOneTitle,
  imageTwo,
  imageTwoTitle,
  imageThree,
  imageThreeTitle,
  cta,
  ctaLink,
  logo,
}: CampaignItemProps) {
  const hasHeader: boolean = title || description;
  return (
    <Card key={title} className="flex flex-col gap-6">
      {logo && (
        <Image
          width={196}
          height={196}
          src={getImageUrl(logo)}
          alt="Campaign Logo"
          className="object-contain"
        />
      )}
      {title || description ? (
        <CardHeader>
          {title && <CardTitle className="h3">{title}</CardTitle>}
          {description && documentToReactComponents(description)}
        </CardHeader>
      ) : null}
      <CardContent
        className={cn("flex flex-col gap-4 lg:flex-row", !hasHeader && "pt-0")}
      >
        <div className="flex gap-6">
          <div className="w-full md:max-w-[400px]">
            <Image
              width={400}
              height={256}
              src={getImageUrl(imageOne)}
              alt={`${imageOneTitle} Image`}
              className="object-contain"
            />
          </div>
          <div className="w-full md:max-w-[400px]">
            <Image
              width={400}
              height={256}
              src={getImageUrl(imageTwo)}
              alt={`${imageTwoTitle} Image`}
            />
          </div>
          <div className="w-full md:max-w-[400px]">
            <Image
              width={400}
              height={256}
              src={getImageUrl(imageThree)}
              alt={`${imageThreeTitle} Image`}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild>
          <Link href={ctaLink}>{cta}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export function CampaignItemAlt(props: CampaignItemProps) {
  const { campaignType } = props;

  const Component =
    CampaignTypeToComponent[campaignType] || DefaultCampaignItem;
  return <Component {...props} />;
}

registerUniformComponent({
  type: "campaignItemAlt",
  component: CampaignItemAlt,
});
