// import { Provider as UIProvider } from "jotai";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <UIProvider> */}
      <UserProvider>{children}</UserProvider>
      {/* </UIProvider> */}
    </div>
  );
}
