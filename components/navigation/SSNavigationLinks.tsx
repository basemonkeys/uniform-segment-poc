"use client";

import classNames from "classnames";
import { useMediaQuery } from "react-responsive";

import { ComponentProps } from "@uniformdev/canvas-next-rsc";

import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";

import { Link } from "@nextui-org/link";
import { NavbarItem } from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <NavbarItem
      key={link?.path}
      className={classNames(
        isActive &&
          isLgScreen &&
          "border-b-3 border-link hover:bg-default-hover",
        !isLgScreen && "border-b-1 border-b-blue-200",
        "flex flex-col px-2",
      )}
    >
      <Link
        as={NextLink}
        href={link?.path || "#"}
        className={classNames("py-5 text-link ", isLgScreen && "!text-black")}
        color="foreground"
      >
        {title}
      </Link>
    </NavbarItem>
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
      className="text-secondary-content font-bold"
    >
      {title}
    </Link>
  );
};

// This component displays the accordion group in the mobile navigation.
export const SSMobileNavigationGroup: React.FC<LinkProps> = ({
  component,
  title,
  link,
}) => {
  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

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
      {!isLgScreen && (
        <Accordion
          key={title}
          className="border-b-1 border-b-blue-200"
          itemClasses={{
            base: "",
            heading: "",
            titleWrapper: "",
            title: "text-base text-link font-normal",
            content: "pt-0 pb-5",
            subtitle: "text-gray-500 text-sm",
            trigger: "",
            startContent: "",
            indicator: "text-link text-xl",
          }}
        >
          {/* @ts-ignore */}
          <AccordionItem title={title}>
            {subNavItems?.map((item: any, index: any) => {
              const { subNavItemTitle, subNavItemLink, subNavItemDescription } =
                item;
              return (
                <NavbarItem key={index} className="flex flex-col">
                  <Link
                    as={NextLink}
                    href={subNavItemLink.path}
                    className="px-3 pt-5 text-link"
                    color="foreground"
                  >
                    {subNavItemTitle}
                  </Link>
                  <span className="px-3 text-xs text-gray-500">
                    {subNavItemDescription}
                  </span>
                </NavbarItem>
              );
            })}
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

// This component displays the dropdown group in the Header navigation.
export const SSHeaderNavigationGroup: React.FC<LinkProps> = ({
  component,
  title,
  link,
}) => {
  const pathname = usePathname();
  const isActive = pathname === link?.path;
  const router = useRouter();

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const subNavItems = component?.slots?.subNavItems?.map((item: any) => {
    const { title, link, description } = item.parameters;
    const subNavItemTitle = title.value;
    const subNavItemLink = link.value.path;
    const subNavItemDescription = description.value;
    return { subNavItemTitle, subNavItemLink, subNavItemDescription };
  });

  return (
    <>
      {/* this is the dropdown in the non-mobile header navigation */}
      {isLgScreen && (
        <Dropdown key={title}>
          <NavbarItem
            key={title}
            className={classNames(isActive ? "border-b-3 border-link" : "")}
          >
            <DropdownTrigger>
              <Button
                disableRipple
                endContent={<ChevronDownIcon className="w-5" />}
                className="flex h-full justify-between gap-1 bg-transparent px-3 py-5 text-base data-[hover=true]:bg-default-hover"
                variant="light"
                radius="none"
              >
                {title}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Silver Sneakers Features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4 text-link data-[hover=true]:bg-default-hover",
              description: "!text-gray-600 !text-sm",
            }}
          >
            {/* @ts-ignore */}
            {subNavItems?.map((item: any, index: any) => {
              const { subNavItemTitle, subNavItemLink, subNavItemDescription } =
                item;
              return (
                // TODO: make this a link
                <DropdownItem
                  key={index}
                  title={subNavItemTitle}
                  description={subNavItemDescription}
                  onPress={() => router.push(subNavItemLink)}
                />
              );
            })}
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};
