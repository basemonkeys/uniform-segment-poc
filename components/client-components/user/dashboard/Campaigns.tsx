/* eslint-disable no-constant-condition */

import { UniformSlot } from "@uniformdev/canvas-next-rsc/component";

import type { CampaignsProps as BaseCampaignsProps } from "@/components/uniform/user/dashboard/Campaigns";

type CampaignsProps = BaseCampaignsProps & {
  user: Types.UserApiProps;
};

export function Campaigns({
  title,
  description,
  user,
  component,
  context,
  slots,
}: CampaignsProps) {
  const hasAppleFitness = user.campaigns?.some(
    (campaign) => campaign.CampaignType === "Fitness+",
  );
  const hasStitch = user.campaigns?.some(
    (campaign) => campaign.CampaignType === "Stitch",
  );
  const hasGetSetUp = user.campaigns?.some(
    (campaign) => campaign.CampaignType === "GetSetUp",
  );
  const campaignItems = component?.slots?.campaignItems
    .filter((item) => {
      if (
        item.parameters?.campaignType?.value === "Apple Fitness+" &&
        !hasAppleFitness
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (item.parameters?.campaignType?.value === "Stitch" && !hasStitch) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (item.parameters?.campaignType?.value === "GetSetUp" && !hasGetSetUp) {
        return false;
      }
      return true;
    });

  const modifiedComponent = {
    ...component,
    slots: {
      campaignItems,
    },
  };

  const hasCampaignItems = (campaignItems?.length ?? 0) > 0;

  return (
    <>
      {hasCampaignItems && (
        <div className="flex flex-col gap-6">
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <UniformSlot
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data={modifiedComponent}
            context={context}
            slot={slots.campaignItems}
          />
        </div>
      )}
    </>
  );
}
