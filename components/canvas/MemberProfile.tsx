import { Suspense } from "react";

import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { Skeleton } from "@/components/ui/skeleton";
import { ComponentError } from "@/components/ui/component-error";

import { ProfileInfoCard } from "@/components/ui/members/ProfileInfoCard";
import { MemberIdCard } from "@/components/ui/members/MemberIdCard";
import { ActivityTrackerCard } from "@/components/ui/members/ActivityTrackerCard";

import { ErrorBoundary } from "@/utils";

export function MemberProfile() {
  return (
    <div className="container m-auto my-12 grid grid-cols-1 justify-evenly gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ErrorBoundary fallBack={<ComponentError />}>
          <Suspense fallback={<Skeleton className="h-[323px] w-full" />}>
            <ProfileInfoCard />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="lg:col-span-2">
        <div className="flex flex-col gap-8">
          <div>
            <Suspense fallback={<Skeleton className="h-[323px] w-full" />}>
              <MemberIdCard />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<Skeleton className="h-[635px] w-full" />}>
              <ActivityTrackerCard />
            </Suspense>
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

export default MemberProfile;
