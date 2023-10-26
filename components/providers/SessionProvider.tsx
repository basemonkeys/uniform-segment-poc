import { UserProvider } from "@auth0/nextjs-auth0/client";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserProvider>{children}</UserProvider>
    </div>
  );
}
