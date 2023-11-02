import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";
import { UniformRichText } from "@uniformdev/canvas-next-rsc";
import Link from "next/link";

import { Card } from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";

type RichTextContentCardProps = ComponentProps<{
  title: string;
  callToAction?: string;
  callToActionUrl?: {
    path: string;
  };
}>;

export function RichTextContentCard({
  title,
  callToAction,
  callToActionUrl,
  component,
}: RichTextContentCardProps) {
  return (
    <>
      {/* the "prose" class comes from https://tailwindcss.com/docs/typography-plugin. Custom SilverSneakers styles can be found in tailwind.config.js. */}
      <Card className="prose mb-12 w-full rounded border bg-white p-4 lg:max-w-[400px]">
        <h3>{title}</h3>
        <UniformRichText parameterId="richText" component={component} />
        {callToAction && callToActionUrl && (
          <Button asChild>
            <Link href={`${callToActionUrl?.path}`}>{callToAction}</Link>
          </Button>
        )}
      </Card>
    </>
  );
}

registerUniformComponent({
  type: "richTextContentCard",
  component: RichTextContentCard,
});
