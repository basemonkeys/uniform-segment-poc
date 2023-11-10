"use client";

import { useEffect, useState } from "react";

import { cn } from "@/utils";

type QuickLinksProps = {
  children: React.ReactNode;
};

export function QuickLinks({ children }: QuickLinksProps) {
  const [sticky, setSticky] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "sticky" : "";
    setSticky(stickyClass);
  };

  return (
    <div
      className={cn(
        "top-[63px] z-50 border-b border-primary-dark bg-primary max-lg:hidden",
        sticky,
      )}
    >
      <div className={"flex w-full items-center justify-center gap-3"}>
        {children}
      </div>
    </div>
  );
}
