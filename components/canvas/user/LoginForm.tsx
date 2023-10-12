import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>Log in to your account</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  );
}

registerUniformComponent({
  type: "loginForm",
  component: LoginForm,
});
