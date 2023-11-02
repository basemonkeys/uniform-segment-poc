import { Suspense } from "react";
import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { Skeleton } from "@/components/ui/primitives/skeleton";
import { ComponentError } from "@/components/ui/client-components/ComponentError";
import { ProfileInfoCard } from "@/components/ui/client-components/user/profile/ProfileInfoCard";
import { MemberIdCard } from "@/components/ui/client-components/user/profile/MemberIdCard";
import { ActivityTrackerCard } from "@/components/ui/client-components/user/profile/ActivityTrackerCard";

import { ErrorBoundary } from "@/utils";
import { getUser, getVisits } from "@/utils/api";

export default async function MemberProfile() {
  const user: Types.UserProps = await getUser();
  const visits: Types.VisitsProps = await getVisits();

  return (
    <div className="my-12 grid grid-cols-1 justify-evenly gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        {/* TODO: figure out ErrorBoundary and Suspense with Tanstack Query */}
        <ErrorBoundary fallBack={<ComponentError />}>
          <Suspense fallback={<Skeleton className="h-[294px] w-full" />}>
            <ProfileInfoCard user={user} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="lg:col-span-2">
        <div className="flex flex-col gap-8">
          <div>
            <ErrorBoundary fallBack={<ComponentError />}>
              <Suspense fallback={<Skeleton className="h-[294px] w-full" />}>
                <MemberIdCard user={user} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div>
            <ErrorBoundary fallBack={<ComponentError />}>
              <Suspense fallback={<Skeleton className="h-[635px] w-full" />}>
                <ActivityTrackerCard visits={visits} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

registerUniformComponent({
  type: "memberProfile",
  component: MemberProfile,
});
