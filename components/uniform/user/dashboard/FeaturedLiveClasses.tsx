import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { FeaturedLiveClasses as BaseFeaturedLiveClasses } from "@/components/client-components/user/dashboard/FeaturedLiveClasses";

import { getApiData } from "@/utils/api";

export type FeaturedLiveClassesProps = {
  title: string;
  description: string;
};

export default async function FeaturedLiveClasses(
  props: FeaturedLiveClassesProps,
): Promise<React.ReactElement> {
  const liveClasses: Types.LiveClassesApiProps = await getApiData("live");

  return <BaseFeaturedLiveClasses classes={liveClasses} {...props} />;
}

registerUniformComponent({
  type: "featuredLiveClasses",
  component: FeaturedLiveClasses,
});
