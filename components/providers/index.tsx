import { UniformContextProvider } from "./UniformContext";
import { TanstackQueryProvider } from "./TanstackQuery";
import { JotaiProvider } from "./JotaiProvider";
import { SessionProvider } from "./SessionProvider";
import { TrackerScoreSync } from "./TrackerScoreSync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UniformContextProvider>
        <TanstackQueryProvider>
          <JotaiProvider>
            <SessionProvider>{children}</SessionProvider>
          </JotaiProvider>
          <TrackerScoreSync />
        </TanstackQueryProvider>
      </UniformContextProvider>
    </div>
  );
}
