"use client";
import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";

export function JotaiProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <Provider>
        {children}
        <DevTools theme="dark" />
      </Provider>
    </div>
  );
}
