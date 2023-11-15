"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ComponentProps } from "@uniformdev/canvas-next-rsc/component";
import { useUser } from "@auth0/nextjs-auth0/client";

import { animateScroll } from "react-scroll";

import { cn, getImageUrl } from "@/utils";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

import { Logo } from "@/components/client-components/Logo";
import { Button } from "@/components/primitives/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/primitives/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/primitives/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import { HeaderSkeleton } from "../../skeletons/HeaderSkeleton";

type MainNavigationProps = ComponentProps & {
  children: React.ReactNode;
  logo: string | Types.CloudinaryImage;
};

const MainNavigation = ({ children, logo }: MainNavigationProps) => {
  const { user, error, isLoading } = useUser();
  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    animateScroll.scrollToTop({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) return <HeaderSkeleton />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <NavigationMenu className="sticky top-0 z-50 max-w-none border-b-2 border-gray-300 bg-white">
        <NavigationMenuList className="m-auto flex items-center px-3 lg:container lg:gap-4">
          {/* Logo */}
          <NavigationMenuItem className="w-5 min-w-[139px] border-r-2 border-solid border-gray-300 py-6 lg:border-none">
            <Logo
              isLink
              href={user ? "/member/dashboard" : "/"}
              src={getImageUrl(logo)}
              className="flex max-lg:mr-4"
            />
          </NavigationMenuItem>

          {/* Main Navigation */}
          <ul className="hidden items-center justify-between gap-4 lg:flex">
            {/* this child element renders the NavigationGroup and Header and Footer NavigationLink components in NavLink.tsx ... either a solo Header or Footer link ... or a group of subNavItems. This displays the main navigation in the header */}
            {children}
          </ul>

          {/* Responsive Mobile Menu Toggle */}
          <NavigationMenuItem className="gap-1 lg:hidden">
            <NavigationMenuTrigger
              // aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden"
            >
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-50 flex w-full flex-col">
              {children}
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="!ml-auto">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback className="bg-primary text-white">
                        {/* <UserIcon className="h-6 w-6 text-white" /> */}
                        {/* get user first and last initials */}
                        <span className="text-sm">{userInitials}</span>
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                    <ChevronDownIcon className="w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/member/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="!font-bold !text-danger"
                      asChild
                    >
                      <a href="/api/auth/logout">
                        <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                        <span>Log Off</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-3">
                <Button variant="secondaryWhite" asChild>
                  <a href="/api/auth/login">Log in</a>
                </Button>
                <Button className="max-sm:hidden" asChild>
                  <Link href="/eligibility/check-eligibility">
                    Check Eligibility
                  </Link>
                </Button>
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Check Eligibility Mobile Button */}
      <div className="fixed bottom-0 z-50 w-full bg-white p-2 px-6 sm:hidden">
        <Button className="w-full" asChild>
          <Link href="/eligibility/check-eligibility">Check Eligibility</Link>
        </Button>
      </div>

      {/* Scroll to Top Button */}
      <div
        className={cn(
          showButton ? "opacity-75" : "opacity-0",
          "fixed bottom-0 right-0 z-50 m-2 mr-6 rounded-md bg-primary p-1 text-white transition-opacity duration-300 ease-out hover:opacity-100 max-sm:bottom-14",
        )}
        onClick={handleScrollToTop}
      >
        <ChevronUpIcon className="w-10" />
      </div>
    </>
  );
};

export default MainNavigation;
