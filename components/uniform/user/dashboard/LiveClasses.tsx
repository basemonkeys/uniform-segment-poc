import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { LiveClasses as BaseLiveClasses } from "@/components/client-components/user/dashboard/LiveClasses";

import { getApiData } from "@/utils/api";

export type LiveClassesProps = {
  title: string;
  description: string;
};

export default async function LiveClasses(
  props: LiveClassesProps,
): Promise<React.ReactElement> {
  const liveClasses: Types.LiveClassesApiProps = await getApiData("live");

  return <BaseLiveClasses classes={liveClasses} {...props} />;
}

registerUniformComponent({
  type: "liveClasses",
  component: LiveClasses,
});
