import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";
import { UniformRichText } from "@uniformdev/canvas-next-rsc";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type RichTextContentCardProps = ComponentProps<{
  callToAction?: string;
  callToActionUrl?: {
    path: string;
  };
}>;

export function RichTextContentCard({
  callToAction,
  callToActionUrl,
  component,
}: RichTextContentCardProps) {
  return (
    <>
      {/* the "prose" class comes from https://tailwindcss.com/docs/typography-plugin. Custom SilverSneakers styles can be found in tailwind.config.js. */}
      <Card className="prose my-12 max-w-lg">
        <UniformRichText parameterId="richText" component={component} />
        <Button asChild>
          <Link href={callToActionUrl?.path as string}>{callToAction}</Link>
        </Button>
      </Card>
    </>
  );
}

registerUniformComponent({
  type: "richTextContentCard",
  component: RichTextContentCard,
});
