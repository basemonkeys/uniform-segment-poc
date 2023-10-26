"use client";

import { DevTools } from "jotai-devtools";

export function JotaiProvider(): JSX.Element {
  return (
    <div>
      <DevTools theme="dark" />
    </div>
  );
}
