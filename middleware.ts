// This file is used to protect routes that require authentication.

import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ["/member/dashboard", "/member/profile"],
};
