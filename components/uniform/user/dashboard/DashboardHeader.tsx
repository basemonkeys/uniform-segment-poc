import { DashboardHeader as BaseDashboardHeader } from "@/components/client-components/user/dashboard/DashboardHeader";

export type DashboardHeaderProps = {
  description: string;
};

export function DashboardHeader(props: DashboardHeaderProps) {
  return <BaseDashboardHeader {...props} />;
}
