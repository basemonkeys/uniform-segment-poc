"use client";

import { useState } from "react";

import { ComponentProps } from "@uniformdev/canvas-next-rsc";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { SSLogo } from "../custom/SSLogo";
import { SSButton } from "../custom/SSButton";
// import CustomButton from "./SSButton";

import { getImageUrl } from "@/utils";

// TODO: get from API
type User = {
  name: string;
};

type MainNavigationProps = ComponentProps & {
  logo: string | Types.CloudinaryImage;
  children: React.ReactNode;
};

const MainNavigation: React.FC<MainNavigationProps> = ({ logo, children }) => {
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
        {/* Logo */}
        <NavbarBrand>
          <SSLogo src={getImageUrl(logo)} isLink href="/" />
        </NavbarBrand>

        {/* Main Navigation */}
        <div className="hidden lg:flex">
          <div className="flex items-center justify-between">
            {/* this child element renders the NavigationGroup and Header and Footer NavigationLink components in NavLink.tsx ... either a solo Header or Footer link ... or a group of subNavItems.  */}
            {children}
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

export default MainNavigation;
