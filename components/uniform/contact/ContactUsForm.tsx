import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { ContactUsForm as HubspotContactUsForm } from "@/components/ui/client-components/contact/ContactUsForm";

export type ContactUsFormProps = ComponentProps<{
  text: string;
  portalId: string;
  formId: string;
}>;

export function ContactUsForm(props: ContactUsFormProps) {
  return (
    <>
      <HubspotContactUsForm {...props} />
    </>
  );
}

registerUniformComponent({
  type: "contactUsForm",
  component: ContactUsForm,
});
