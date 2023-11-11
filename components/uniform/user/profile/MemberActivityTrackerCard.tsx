import { Suspense } from "react";
import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { Skeleton } from "@/components/primitives/skeleton";
import { ComponentError } from "@/components/client-components/ComponentError";
import { MemberActivityTrackerCard as BaseMemberActivityTrackerCard } from "@/components/client-components/user/profile/MemberActivityTrackerCard";

import { ErrorBoundary } from "@/utils";
import { getVisits } from "@/utils/api";

export type MemberActivityTrackerCardProps = Omit<ComponentProps, "context"> & {
  title: string;
  description: string;
};

export async function MemberActivityTrackerCard(
  props: MemberActivityTrackerCardProps,
) {
  const visits: Types.VisitsApiProps = await getVisits();

  return (
    <div className="col-span-2">
      <ErrorBoundary fallBack={<ComponentError />}>
        <Suspense fallback={<Skeleton className="h-[294px] w-full" />}>
          <BaseMemberActivityTrackerCard visits={visits} {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

registerUniformComponent({
  type: "memberActivityTrackerCard",
  component: MemberActivityTrackerCard,
});
