import { UniformContextProvider } from "./UniformContext";
import { TanstackQueryProvider } from "./TanstackQuery";
import { JotaiProvider } from "./JotaiProvider";
import { SessionProvider } from "./SessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UniformContextProvider>
        <TanstackQueryProvider>
          <SessionProvider>{children}</SessionProvider>
          <JotaiProvider />
        </TanstackQueryProvider>
      </UniformContextProvider>
    </div>
  );
}
