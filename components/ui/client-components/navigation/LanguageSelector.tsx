"use client";

import { GlobeAltIcon } from "@heroicons/react/20/solid";

export function LanguageSelector() {
  return (
    <div className="w-full border bg-white p-2 text-sm text-primary">
      <div className="flex items-center justify-end gap-1 lg:container">
        <GlobeAltIcon className="h-4 w-4" />
        <a href="/en">English</a>
      </div>
    </div>
  );
}
