import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

type CampaignsProps = ComponentProps<{
  title: string;
  description: string;
}>;

export function Campaigns({
  title,
  description,
  component,
  context,
}: CampaignsProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <UniformSlot name="campaignItems" data={component} context={context} />
    </div>
  );
}

registerUniformComponent({
  type: "campaigns",
  component: Campaigns,
});
