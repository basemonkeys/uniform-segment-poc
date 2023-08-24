"use client";

import { useState } from "react";

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

import Image from "next/image";
import Link from "next/link";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { SSButton } from "./SSButton";

import { getImageUrl } from "@/utils";

// TODO: replace with Cloudinary
import logo from "../public/logo_wordmark.svg";

type User = {
  name: string;
};

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
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
          <Link className="py-6 pr-3" href="/">
            <Image
              src={getImageUrl(logo.src)}
              width={125}
              height={57}
              alt="Silver Sneakers"
            />
          </Link>
        </NavbarBrand>
        {/* Main Navigation */}
        <div className="hidden lg:flex">{children}</div>
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

      {/* <NavbarContent className="hidden md:flex gap-4"></NavbarContent> */}

      {/* Header CTAs */}
      <NavbarContent className="gap-3" justify="end">
        {user ? (
          <>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <SSButton color="primary" size="md" className="ml-6">
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
                size="md"
                onClick={() => setUser({ name: "Jane Doe" })}
              >
                Log in
              </SSButton>
            </NavbarItem>
            <NavbarItem>
              <SSButton
                color="primary"
                size="md"
                onClick={() => setUser({ name: "Jane Doe" })}
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

export default Header;
