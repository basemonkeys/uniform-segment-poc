import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { FitnessLocations as BaseFitnessLocations } from "@/components/client-components/user/dashboard/FitnessLocations";

import { getFitnessLocations } from "@/utils/api";

export default async function FitnessLocations(): Promise<React.ReactElement> {
  const fitnessLocations: Types.FitnessLocationsProps =
    await getFitnessLocations();

  return <BaseFitnessLocations locations={fitnessLocations} />;
}

registerUniformComponent({
  type: "fitnessLocations",
  component: FitnessLocations,
});
