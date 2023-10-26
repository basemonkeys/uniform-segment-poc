import { TanstackQueryProvider } from "@/components/providers/TanstackQuery";
import { JotaiProvider } from "@/components/providers/JotaiProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TanstackQueryProvider>
        <SessionProvider>{children}</SessionProvider>
        <JotaiProvider />
      </TanstackQueryProvider>
    </div>
  );
}
