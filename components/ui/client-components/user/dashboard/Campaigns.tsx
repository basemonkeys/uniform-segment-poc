"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";

import { getMember } from "@/utils/api";

export function Campaigns(props: { members: Types.MemberProps }) {
  const { data, error, isLoading } = useQuery<Types.MemberProps, Error>({
    queryKey: ["members"],
    queryFn: getMember,
    initialData: props.members,
  });

  const campaigns = data?.campaigns;

  console.log(data, error, isLoading);
  console.log(campaigns);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>
            View your current campaigns and their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {campaigns?.map((campaign, index) => (
              <div key={index}>
                <div>{campaign.CampaignType}</div>
                {/* <div>{campaign.description}</div> */}
                {/* <div>{campaign.progress}</div> */}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div>Card Footer</div>
        </CardFooter>
      </Card>
    </>
  );
}
