import { Suspense } from "react";
import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { Skeleton } from "@/components/primitives/skeleton";
import { ComponentError } from "@/components/client-components/ComponentError";
import { MemberIdCard as BaseMemberIdCard } from "@/components/client-components/user/profile/MemberIdCard";

import { ErrorBoundary } from "@/utils";
import { getApiData } from "@/utils/api";

export type MemberIdCardProps = {
  title: string;
  description: string;
};

export async function MemberIdCard(props: MemberIdCardProps) {
  const user: Types.UserApiProps = await getApiData("user");

  return (
    <div className="col-span-2 lg:col-span-1">
      <ErrorBoundary fallBack={<ComponentError />}>
        <Suspense fallback={<Skeleton className="h-[294px] w-full" />}>
          <BaseMemberIdCard user={user} {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

registerUniformComponent({
  type: "memberIdCard",
  component: MemberIdCard,
});
