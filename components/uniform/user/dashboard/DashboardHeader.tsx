import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { DashboardHeader as BaseDashboardHeader } from "@/components/client-components/user/dashboard/DashboardHeader";

export function DashboardHeader() {
  return <BaseDashboardHeader />;
}

registerUniformComponent({
  type: "dashboardHeader",
  component: DashboardHeader,
});
