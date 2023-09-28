"use client";

import { cn } from "@/lib/utils";

import { ComponentProps } from "@uniformdev/canvas-next-rsc";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Separator } from "@/components/ui/separator";

export type LinkProps = Omit<ComponentProps, "context"> & {
  title: string;
  link: {
    path: string;
  };
  description?: string;
};

// This component displays the non-dropdown menu items in the Header navigation and the non-accordion menu items in the mobile navigation.
export const SSHeaderLink: React.FC<Omit<LinkProps, "component">> = ({
  link,
  title,
}) => {
  const pathname = usePathname();
  const isActive = pathname === link?.path;

  return (
    <NavigationMenuItem
      key={link?.path}
      className={cn(
        "flex flex-col px-2 hover:bg-default-hover",
        isActive &&
          "border-b border-b-gray-200 lg:border-b-3 lg:border-link hover:lg:bg-default-hover",
      )}
    >
      <Link href={link?.path || "#"} className="py-5 text-link lg:text-black">
        {title}
      </Link>
    </NavigationMenuItem>
  );
};

// This component displays the menu items in the Footer.
export const SSFooterLink: React.FC<Omit<LinkProps, "component">> = ({
  link,
  title,
}) => {
  return (
    <Link
      key={link?.path}
      href={link?.path || "#"}
      className="flex items-center gap-3"
      target={link?.path?.startsWith("http") ? "_blank" : "_self"}
      rel={link?.path?.startsWith("http") ? "noopener noreferrer" : ""}
    >
      <div className="text-sm text-white hover:underline">{title}</div>
      <div className="divider mt-0.5 h-2/3 bg-white md:visible">
        <Separator orientation="vertical" />
      </div>
    </Link>
  );
};

// This component displays either the accordion group in the mobile navigation or the dropdown group in the Header navigation.
export const SSNavigationGroup: React.FC<LinkProps> = ({
  component,
  title,
  link,
}) => {
  const pathname = usePathname();

  const subNavItems = component?.slots?.subNavItems?.map((item: any) => {
    const { title, link, description } = item.parameters;
    const subNavItemTitle = title.value;
    const subNavItemLink = link.value;
    const subNavItemDescription = description.value;
    return { subNavItemTitle, subNavItemLink, subNavItemDescription };
  });

  return (
    <>
      {/* this is the accordion in the mobile navigation */}
      <Accordion type="single" collapsible className="w-full lg:hidden">
        <AccordionItem
          value="item-1"
          className={cn(
            "px-2",
            title === "Classes" &&
              pathname.includes("classes") &&
              "border-b-none border-l-4 border-link",
            title === "More" &&
              pathname.includes("more") &&
              "border-b-none border-l-4 border-link",
          )}
        >
          <AccordionTrigger className="z-10 flex justify-between border-b border-b-gray-200 text-base font-normal text-link">
            {title}
          </AccordionTrigger>
          <AccordionContent>
            {subNavItems?.map((item: any, index: any) => {
              const { subNavItemTitle, subNavItemLink, subNavItemDescription } =
                item;
              return (
                <NavigationMenuItem
                  key={index}
                  className={cn(
                    "flex flex-col py-5",
                    pathname === subNavItemLink.path &&
                      "border-l-4 border-primary bg-default-hover",
                  )}
                >
                  <Link href={subNavItemLink.path} className="px-3 text-link">
                    {subNavItemTitle}
                  </Link>
                  <span className="px-3 text-xs text-gray-500">
                    {subNavItemDescription}
                  </span>
                </NavigationMenuItem>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* this is the dropdown in the non-mobile header navigation */}
      <NavigationMenu
        className={cn(
          "h-full px-2 py-3 hover:bg-default-hover max-md:hidden",
          title === "Classes" &&
            pathname.includes("classes") &&
            "border-b-3 border-link",
          title === "More" &&
            pathname.includes("more") &&
            "border-b-3 border-link",
        )}
      >
        <NavigationMenuItem>
          <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
          <NavigationMenuContent aria-label="Silver Sneakers Features">
            <ul className="flex w-[340px] flex-col">
              {/* @ts-ignore */}
              {subNavItems?.map((item: any, index: any) => {
                const {
                  subNavItemTitle,
                  subNavItemLink,
                  subNavItemDescription,
                } = item;
                return (
                  <li
                    key={index}
                    className={cn(
                      "flex w-full cursor-pointer flex-col p-2 hover:bg-default-hover",
                      pathname === subNavItemLink.path &&
                        "border-l-4 border-primary bg-default-hover",
                    )}
                  >
                    <NavigationMenuLink asChild>
                      <>
                        <Link
                          href={subNavItemLink.path}
                          className="gap-4 px-3 text-link hover:bg-default-hover"
                        >
                          {subNavItemTitle}
                        </Link>
                        <span className="px-3 text-sm text-gray-600">
                          {subNavItemDescription}
                        </span>
                      </>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </>
  );
};
