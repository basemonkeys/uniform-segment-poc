import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { getApiData } from "@/utils/api";

import { Campaigns as BaseCampaigns } from "@/components/client-components/user/dashboard/Campaigns";

export type CampaignsProps = ComponentProps<{
  title: string;
  description: string;
}>;

export default async function Campaigns(props: CampaignsProps) {
  const user: Types.UserApiProps = await getApiData("user");

  return <BaseCampaigns user={user} {...props} />;
}

registerUniformComponent({
  type: "campaigns",
  component: Campaigns,
});
