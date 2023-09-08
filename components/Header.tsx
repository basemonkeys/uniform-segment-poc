"use client";

import { useState } from "react";

import {
  ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Link,
  Button,
} from "@nextui-org/react";

// import { Link } from "@nextui-org/react";
// import NextLink from "next/link";
// import Link from "next/link";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { SSLogo } from "./Logo";
import { SSButton } from "./SSButton";
// import CustomButton from "./SSButton";

type User = {
  name: string;
};

type Props = ComponentProps & {
  // links: Types.ProjectMapLink[];
};

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Classes",
    path: "/classes",
    type: "placeholder",
    subItems: [
      {
        name: "Live Online",
        description: "Fitness from the comfort of your home",
        path: "/classes/live-online",
      },
      {
        name: "Local Community",
        description: "Online and in-person classes in your area",
        path: "/classes/local-community",
      },
      {
        name: "On Demand Videos",
        description: "Workouts wherever you are",
        path: "/classes/on-demand-videos",
      },
    ],
  },
  {
    name: "Fitness Locations",
    path: "/locations",
  },
  {
    name: "More",
    path: "/",
    type: "placeholder",
    subItems: [
      {
        name: "Articles",
        description: "Daily workout tips, recipes, and more",
        path: "/articles",
      },
      {
        name: "Health Plan Partners",
        description: "Find a participating plan with SilverSneakers",
        path: "/health-plan-partners",
      },
      {
        name: "FAQs",
        description: "Answer your frequently asked questions",
        path: "/faqs",
      },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User>();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      isBordered
      className="border-gray-300"
    >
      {/* Responsive Branding and Main Navigation */}
      <NavbarContent
        className="border-r-1 border-solid border-gray-300 lg:border-none"
        justify="center"
      >
        <NavbarBrand>
          <SSLogo isLink href="/" className="py-6 pr-3" />
        </NavbarBrand>

        {/* Main Navigation */}
        <div className="hidden lg:flex">
          <div
            key={`links-${links.length}`}
            className="flex items-center justify-between"
          >
            {links?.map((link: Types.ProjectMapLink, index: number) => (
              <>
                {link?.type === "placeholder" ? (
                  <Dropdown>
                    <NavbarItem key={link?.path}>
                      <DropdownTrigger>
                        <Button
                          disableRipple
                          endContent={<ChevronDownIcon className="w-5" />}
                          href="#"
                          className="flex justify-between gap-1 bg-transparent p-0 px-3 py-5 hover:bg-default-hover"
                        >
                          {link.name}
                        </Button>
                      </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                      aria-label="ACME features"
                      className="w-[340px]"
                      itemClasses={{
                        base: "gap-4 text-primary",
                        description: "!text-gray-600 !text-sm",
                      }}
                    >
                      {link?.subItems?.map(
                        (
                          subItemsLink: Types.ProjectMapSubLink,
                          index: number,
                        ) => (
                          <DropdownItem
                            key={index}
                            title={subItemsLink.name}
                            description={subItemsLink.description}
                          />
                        ),
                      )}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <NavbarItem key={link?.path}>
                    <Link
                      href={link?.path}
                      className="px-3 py-5 hover:bg-default-hover"
                      color="foreground"
                    >
                      {link.name}
                    </Link>
                  </NavbarItem>
                )}
              </>
            ))}
            <NavbarMenu className="">
              {links?.map((link: Types.ProjectMapLink, index: number) => (
                <>
                  {link?.type === "placeholder" ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <NavbarItem key={link?.path}>
                          <Button
                            disableRipple
                            endContent={<ChevronDownIcon className="w-5" />}
                            href="#"
                            className="data-[hover=true] flex justify-between gap-1 bg-transparent p-0 px-3 py-5 hover:bg-default-hover"
                          >
                            {link.name}
                          </Button>
                        </NavbarItem>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                          base: "gap-4",
                        }}
                      >
                        <DropdownItem
                          key="autoscaling"
                          title=""
                          description="ACME scales apps to meet user demand, automagically, based on load."
                          startContent={"icon"}
                        >
                          Autoscaling
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <NavbarMenuItem key={link?.path}>
                      <Link
                        href={link?.path}
                        className="px-3 py-5 hover:bg-default-hover"
                        color="foreground"
                      >
                        {link.name}
                      </Link>
                    </NavbarMenuItem>
                  )}
                </>
              ))}
            </NavbarMenu>
          </div>
        </div>
      </NavbarContent>

      {/* Responsive Menu Toggle */}
      <NavbarContent className="gap-1 lg:hidden" justify="start">
        Menu
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
          icon={
            isMenuOpen ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )
          }
        />
      </NavbarContent>

      {/* Header CTAs */}
      <NavbarContent className="gap-3" justify="end">
        {user ? (
          <>
            {/* TODO: fix these keys */}
            <NavbarItem key={"1"}>
              <Dropdown>
                <DropdownTrigger>
                  <SSButton
                    disableRipple
                    className="ml-6 bg-transparent p-0 text-black data-[hover=true]:bg-transparent"
                    endContent={<ChevronDownIcon className="w-5" />}
                    color="primary"
                    size="lg"
                  >
                    Profile
                  </SSButton>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownSection showDivider>
                    <DropdownItem key="new">Member ID</DropdownItem>
                    <DropdownItem key="copy">Personal Info</DropdownItem>
                    <DropdownItem key="edit">Activity Tracker</DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownItem
                      className="text-error"
                      color="danger"
                      onClick={() => setUser(undefined)}
                    >
                      Log Off
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem key={"1"}>
              <SSButton
                color="secondaryWhite"
                size="lg"
                onClick={() => setUser({ name: "User Name" })}
              >
                Log in
              </SSButton>
            </NavbarItem>
            <NavbarItem key={"2"}>
              <SSButton
                color="primary"
                size="lg"
                onClick={() => setUser(undefined)}
              >
                Check Eligibility
              </SSButton>
              {/* <CustomButton /> */}
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

registerUniformComponent({
  type: "header",
  component: Header,
});

export default Header;
