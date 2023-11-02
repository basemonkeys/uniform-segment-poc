import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { Header } from "@/components/ui/client-components/user/dashboard/Header";
import { LiveClasses } from "@/components/ui/client-components/user/dashboard/LiveClasses";
import { FitnessLocations } from "@/components/ui/client-components/user/dashboard/FitnessLocations";
// import { Campaigns } from "@/components/ui/client-components/user/dashboard/Campaigns";
// import { OnDemandVideos } from "@/components/ui/client-components/user/dashboard/OnDemandVideos";

import { getLiveClasses, getFitnessLocations } from "@/utils/api";

export default async function MemberDashboard(): Promise<React.ReactElement> {
  // TODO: fetch all component data. Can they be combined into one?
  const liveClasses: Types.LiveClassesProps = await getLiveClasses();
  const fitnessLocations: Types.FitnessLocationsProps =
    await getFitnessLocations();
  // const members: Types.MemberProps = await getMember();

  return (
    <div className="my-12 flex flex-col gap-12">
      <Header />
      <LiveClasses classes={liveClasses} />
      <FitnessLocations locations={fitnessLocations} />
      {/* <Campaigns members={members} /> */}
      {/* TODO: add card components grid */}
      {/* <FeaturedArticles articles={featuredArticles}/> */}
      {/* <OnDemandVideos /> */}
    </div>
  );
}

registerUniformComponent({
  type: "memberDashboard",
  component: MemberDashboard,
});
