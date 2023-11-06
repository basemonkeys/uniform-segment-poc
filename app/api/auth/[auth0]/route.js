// https://developer.auth0.com/resources/guides/web-app/nextjs/basic-authentication

import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/member/dashboard",
  }),
  //   signup: handleLogin({
  //     authorizationParams: {
  //       screen_hint: "signup",
  //     },
  //     returnTo: "/member/dashboard",
  //   }),
});
