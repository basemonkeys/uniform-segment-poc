import { Suspense } from "react";
import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { ComponentError } from "@/components/client-components/ComponentError";
import { Skeleton } from "@/components/primitives/skeleton";
import { MemberProfileCard as BaseMemberProfileCard } from "@/components/client-components/user/profile/MemberProfileCard";

import { ErrorBoundary } from "@/utils";
import { getUser } from "@/utils/api";

export type MemberProfileCardProps = {
  title: string;
  description: string;
};

export async function MemberProfileCard(props: MemberProfileCardProps) {
  const user: Types.UserApiProps = await getUser();

  return (
    <div className="col-span-2 lg:col-span-1">
      <ErrorBoundary fallBack={<ComponentError />}>
        <Suspense fallback={<Skeleton className="h-[294px] w-full" />}>
          <BaseMemberProfileCard user={user} {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

registerUniformComponent({
  type: "memberProfileCard",
  component: MemberProfileCard,
});
