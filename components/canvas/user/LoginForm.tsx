import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-next-rsc";

import { LoginForm as BaseLoginForm } from "@/components/ui/client-components/user/LoginForm";

export type LoginFormProps = ComponentProps<{
  heading: string;
  text: string;
}>;

export function LoginForm(props: LoginFormProps) {
  return (
    <>
      {/* this is a client component */}
      <BaseLoginForm {...props} />
    </>
  );
}

registerUniformComponent({
  type: "loginForm",
  component: LoginForm,
});
