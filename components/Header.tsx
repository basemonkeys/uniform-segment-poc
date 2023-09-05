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
} from "@nextui-org/react";

import Link from "next/link";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { SSLogo } from "./Logo";
import { SSButton } from "./SSButton";

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
            className="flex justify-between items-center"
          >
            {links?.map((link: Types.ProjectMapLink, index: number) => (
              <>
                {link?.type === "placeholder" ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <NavbarItem key={link?.path}>
                        <Link
                          href="#"
                          className="py-5 px-3 flex gap-1 justify-between hover:bg-gray-200"
                        >
                          {link.name}
                          <ChevronDownIcon className="w-5" />
                        </Link>
                      </NavbarItem>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="ACME features"
                      className="w-[340px]"
                      itemClasses={{
                        base: "gap-4",
                      }}
                    >
                      {link?.subItems?.map(
                        (subLink: Types.ProjectMapLink, index: number) => (
                          <DropdownItem
                            key={index}
                            title={subLink.name}
                            description={subLink.description}
                            className="text-primary !font-bold"
                          />
                        ),
                      )}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <NavbarItem key={link?.path}>
                    <Link
                      href={link?.path}
                      className="py-5 px-3 hover:bg-gray-200"
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
                          <Link
                            href="#"
                            className="py-5 px-3 flex gap-1 justify-between hover:bg-gray-200"
                          >
                            {link.name}
                            <ChevronDownIcon className="w-5" />
                          </Link>
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
                          title="test"
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
                        className="py-5 px-3 hover:bg-gray-200"
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
      <NavbarContent className="lg:hidden gap-1" justify="start">
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
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <SSButton
                    disableRipple
                    className="ml-6 p-0 bg-transparent data-[hover=true]:bg-transparent text-black"
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
                      className="text-danger"
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
            <NavbarItem>
              <SSButton
                color="secondaryWhite"
                size="lg"
                onClick={() => setUser({ name: "User Name" })}
              >
                Log in
              </SSButton>
            </NavbarItem>
            <NavbarItem>
              <SSButton
                color="primary"
                size="lg"
                onClick={() => setUser(undefined)}
              >
                Check Eligibility
              </SSButton>
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
