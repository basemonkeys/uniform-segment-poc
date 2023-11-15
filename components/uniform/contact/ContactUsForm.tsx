import { type ComponentProps } from "@uniformdev/canvas-next-rsc/component";

import { ContactUsForm as HubspotContactUsForm } from "@/components/client-components/contact/ContactUsForm";

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
