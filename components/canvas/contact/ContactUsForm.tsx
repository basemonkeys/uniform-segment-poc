import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import { ContactUsForm as HubspotContactUsForm } from "../../ui/client-components/contact/ContactUsForm";

export type ContactUsFormProps = ComponentProps<{
  heading: string;
  text: string;
  portalId: string;
  formId: string;
}>;

export function ContactUsForm(props: ContactUsFormProps) {
  return (
    <>
      {/* this is a client component */}
      <HubspotContactUsForm {...props} />
    </>
  );
}

registerUniformComponent({
  type: "contactUsForm",
  component: ContactUsForm,
});
