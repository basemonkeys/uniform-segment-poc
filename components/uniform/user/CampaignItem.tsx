import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";

type CampaignItemProps = ComponentProps<{
  title: string;
  description: string;
  callToAction: string;
  callToActionUrl: string;
  image: {
    url: string;
  };
  logo: {
    url: string;
  };
}>;

export function CampaignItem({
  title,
  description,
  callToAction,
  callToActionUrl,
} // image,
// logo,
// component,
: CampaignItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={callToActionUrl}>{callToAction}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

registerUniformComponent({
  type: "campaignItem",
  component: CampaignItem,
});
