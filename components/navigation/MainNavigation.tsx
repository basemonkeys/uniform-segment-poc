"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ComponentProps } from "@uniformdev/canvas-next-rsc";

import { getImageUrl } from "@/utils";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { SSLogo } from "../custom/SSLogo";
import { SSButton } from "../custom/SSButton";
// import CustomButton from "./SSButton";

// TODO: get from API
type User = {
  name: string;
};

type MainNavigationProps = ComponentProps & {
  children: React.ReactNode;
  logo: string | Types.CloudinaryImage;
};

const MainNavigation: React.FC<MainNavigationProps> = ({
  children,
  logo,
}: MainNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User>();

  const router = useRouter();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      isBordered
      className="border-gray-300"
    >
      {/* Branding and Main Navigation */}
      <NavbarContent
        className="border-r-1 border-solid border-gray-300 lg:border-none"
        justify="center"
      >
        {/* Logo */}
        <NavbarBrand>
          <SSLogo isLink href="/" src={getImageUrl(logo)} />
        </NavbarBrand>

        {/* Main Navigation */}
        <NavbarContent className="flex hidden items-center justify-between lg:flex">
          {/* this child element renders the NavigationGroup and Header and Footer NavigationLink components in NavLink.tsx ... either a solo Header or Footer link ... or a group of subNavItems. This displays the main navigation in the header */}
          {children}
        </NavbarContent>
      </NavbarContent>

      {/* Responsive Mobile Menu Toggle */}
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

      {/* Mobile Navigation */}
      <NavbarContent>
        <NavbarMenu className="bg-white">
          <NavbarItem key={"1"}>{children}</NavbarItem>
        </NavbarMenu>
      </NavbarContent>

      {/* Header CTA Buttons */}
      <NavbarContent className="gap-3" justify="end">
        {user ? (
          <>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <SSButton
                    disableRipple
                    className="ml-6 bg-transparent p-0 font-normal text-foreground data-[hover=true]:bg-transparent"
                    endContent={<ChevronDownIcon className="w-5" />}
                    size="lg"
                  >
                    Profile
                  </SSButton>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  itemClasses={{
                    base: "gap-4 text-link data-[hover=true]:bg-default-hover",
                    wrapper: "hover:text-link",
                    description: "!text-gray-600 !text-sm",
                  }}
                >
                  <DropdownSection showDivider>
                    <DropdownItem
                      key="memberId"
                      title={"My Profile"}
                      onPress={() => router.push("/member-profile")}
                    />
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownItem
                      className="!font-bold text-error hover:text-success"
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
              {/* <CustomButton /> */}
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default MainNavigation;
