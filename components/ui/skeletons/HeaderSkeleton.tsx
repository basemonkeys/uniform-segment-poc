// This skeleton belongs to components/ui/client-components/navigation/MainNavigation.tsx

import { Skeleton } from "@/components/ui/primitives/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="top-0 max-w-none border-b-2 border-gray-300 bg-white">
      <div className="m-auto flex h-[67px] items-center justify-between px-3 lg:container">
        <div className="flex items-center lg:gap-4">
          {/* Logo */}
          <div className="w-5 min-w-[139px] border-r-2 border-solid border-gray-300 py-4 lg:border-none">
            <Skeleton className="mr-4 h-[37px]" />
          </div>

          {/* Main Navigation */}
          <div className="hidden items-center justify-between gap-7 lg:flex">
            <Skeleton className="h-[32px] w-[75px]" />
            <Skeleton className="h-[32px] w-[75px]" />
            <Skeleton className="h-[32px] w-[175px]" />
            <Skeleton className="h-[32px] w-[75px]" />
          </div>
        </div>

        {/* Responsive Mobile Menu Toggle */}
        <div className="w-full gap-1 lg:hidden">
          <Skeleton className="ml-4 h-[30px] w-[80px]" />
        </div>

        <div className="flex items-center gap-3">
          {/* <Skeleton className="h-10 w-10 rounded-full" /> */}
          <Skeleton className="h-[37px] w-20 p-3" />
          <Skeleton className="h-[37px] w-[150px] p-3" />
        </div>
      </div>
    </div>
  );
}
