import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { LiveClasses as BaseLiveClasses } from "@/components/client-components/user/dashboard/LiveClasses";

import { getLiveClasses } from "@/utils/api";

export default async function LiveClasses(): Promise<React.ReactElement> {
  const liveClasses: Types.LiveClassesProps = await getLiveClasses();

  return <BaseLiveClasses classes={liveClasses} />;
}

registerUniformComponent({
  type: "liveClasses",
  component: LiveClasses,
});
