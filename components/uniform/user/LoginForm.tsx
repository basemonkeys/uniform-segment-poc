// TODO: delete this component

import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { LoginForm as BaseLoginForm } from "@/components/ui/client-components/user/LoginForm";

export type LoginFormProps = ComponentProps<{
  heading: string;
  text: string;
}>;

export function LoginForm(props: LoginFormProps) {
  return (
    <>
      <BaseLoginForm {...props} />
    </>
  );
}

registerUniformComponent({
  type: "loginForm",
  component: LoginForm,
});
