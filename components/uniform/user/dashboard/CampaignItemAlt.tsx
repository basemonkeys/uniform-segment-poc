/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType } from "react";
import { type ComponentProps } from "@uniformdev/canvas-next-rsc/component";

import Link from "next/link";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { cn } from "@/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { CloudinaryImage } from "@/components/client-components/Cloudinary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faDumbbell,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

export enum CampaignType {
  GetSetUp = "GetSetUp",
}

enum ClassTypeIcon {
  faHeart = "Wellbeing",
  faDumbbell = "Fitness",
  faUtensils = "More",
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
  images: [
    {
      secure_url: string;
      public_id: string;
      fields: {
        title: string;
      };
      context: {
        custom: {
          caption: string;
        };
      };
    },
  ];
  mobileImage: string;
  cta: string;
  ctaLink: string;
  logo?: string;
}>;

function GetSetUpCampaignItem({
  title,
  description,
  images,
  mobileImage,
  cta,
  ctaLink,
  logo,
}: CampaignItemProps) {
  const hasHeader: boolean = title || description;

  return (
    <Card key={title} className="flex flex-col gap-6">
      {logo && (
        <CloudinaryImage
          width={196}
          height={196}
          src={logo}
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
        {/* mobile image */}
        <div className="md:hidden">
          <CloudinaryImage
            width={800}
            height={256}
            src={mobileImage}
            alt={`${title} Image`}
            className="object-contain"
          />
        </div>

        {/* desktop images */}
        <div className="hidden w-full gap-6 md:flex">
          {images.map((image) => (
            <>
              <div className="relative md:max-w-[400px]">
                <div className="absolute w-1/2 bg-gradient-to-r from-black px-4 py-2 text-white">
                  <div className="flex items-center gap-2">
                    {Object.values(ClassTypeIcon).map((value) => {
                      if (image.context.custom.caption.includes(value)) {
                        return (
                          <>
                            <FontAwesomeIcon
                              icon={
                                value === "Wellbeing"
                                  ? faHeart
                                  : value === "Fitness"
                                  ? faDumbbell
                                  : faUtensils
                              }
                              className="h-4 w-4"
                            />
                          </>
                        );
                      }
                    })}
                    {image.context.custom.caption}
                  </div>
                </div>
                <CloudinaryImage
                  key={image.public_id}
                  width={400}
                  height={256}
                  src={image.secure_url}
                  // alt={`${image.fields.title} Image`}
                  alt={`${image.public_id} Image`}
                  className="object-contain"
                />
              </div>
            </>
          ))}
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
  images,
  cta,
  ctaLink,
  logo,
}: CampaignItemProps) {
  const hasHeader: boolean = title || description;
  return (
    <Card key={title} className="flex flex-col gap-6">
      {logo && (
        <CloudinaryImage
          width={196}
          height={196}
          src={logo}
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
        <div className="flex w-full gap-6">
          {images.map((image) => (
            <>
              <div className="relative md:max-w-[400px]">
                <div className="absolute w-1/2 bg-gradient-to-r from-black px-4 py-2 text-white">
                  {image.fields.title}
                </div>
                <CloudinaryImage
                  key={image.public_id}
                  width={400}
                  height={256}
                  src={image.secure_url}
                  // alt={`${image.fields.title} Image`}
                  alt={`${image.public_id} Image`}
                  className="object-contain"
                />
              </div>
            </>
          ))}
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
