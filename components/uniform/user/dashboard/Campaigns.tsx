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
    <div className="flex flex-col gap-6">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <UniformSlot name="campaignItems" data={component} context={context} />
    </div>
  );
}

registerUniformComponent({
  type: "campaigns",
  component: Campaigns,
});
