import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { EligibilityForm as BaseEligibilityForm } from "@/components/client-components/user/EligibilityForm";

export type EligibilityFormProps = ComponentProps<{
  title: string;
}>;

export function EligibilityForm(props: EligibilityFormProps) {
  return (
    <>
      {/* this is a client component */}
      <BaseEligibilityForm {...props} />
    </>
  );
}

registerUniformComponent({
  type: "eligibilityForm",
  component: EligibilityForm,
});
