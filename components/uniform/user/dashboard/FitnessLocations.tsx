import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import { FitnessLocations as BaseFitnessLocations } from "@/components/client-components/user/dashboard/FitnessLocations";

import { getApiData } from "@/utils/api";

export type FitnessLocationsProps = {
  title: string;
  description: string;
};

export default async function FitnessLocations(
  props: FitnessLocationsProps,
): Promise<React.ReactElement> {
  const fitnessLocations: Types.FitnessLocationsApiProps =
    await getApiData("locations");

  return <BaseFitnessLocations locations={fitnessLocations} {...props} />;
}

registerUniformComponent({
  type: "fitnessLocations",
  component: FitnessLocations,
});
