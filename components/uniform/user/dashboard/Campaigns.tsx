import { type ComponentProps } from "@uniformdev/canvas-next-rsc/component";

import { getApiData } from "@/utils/api";

import { Campaigns as BaseCampaigns } from "@/components/client-components/user/dashboard/Campaigns";

export type CampaignsProps = ComponentProps<
  {
    title: string;
    description: string;
  },
  "faqs"
>;

export async function Campaigns(props: CampaignsProps) {
  const user: Types.UserApiProps = await getApiData("user");

  return <BaseCampaigns user={user} {...props} />;
}
