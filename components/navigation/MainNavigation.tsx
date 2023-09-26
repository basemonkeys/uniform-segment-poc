"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ComponentProps } from "@uniformdev/canvas-next-rsc";

import { getImageUrl } from "@/lib/utils";

import {
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

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
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <NavigationMenu className="sticky top-0 z-50 max-w-none border-b-2 border-gray-300 bg-white">
        <NavigationMenuList className="m-auto justify-between px-3 lg:container">
          <div className="flex items-center">
            {/* Logo */}
            <NavigationMenuItem className="min-w-[139px] border-r-2 border-solid border-gray-300 py-6 lg:border-none">
              <Logo isLink href="/" src={getImageUrl(logo)} className="flex" />
            </NavigationMenuItem>

            {/* Main Navigation */}
            <div className="hidden items-center justify-between gap-4 lg:flex">
              {/* this child element renders the NavigationGroup and Header and Footer NavigationLink components in NavLink.tsx ... either a solo Header or Footer link ... or a group of subNavItems. This displays the main navigation in the header */}
              {children}
            </div>

            {/* Responsive Mobile Menu Toggle */}
            <NavigationMenuItem className="w-full gap-1 lg:hidden">
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
          </div>

          <NavigationMenuItem>
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback className="bg-primary text-white">
                        <UserIcon className="h-6 w-6 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    Profile
                    <ChevronDownIcon className="w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => router.push("/member-profile")}
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="!font-bold !text-danger"
                      onClick={() => setUser(undefined)}
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                      <span>Log Off</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="secondaryWhite"
                  size="xl"
                  onClick={() => setUser({ name: "User Name" })}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="xl"
                  disabled={loading}
                  onClick={() => setLoading(true)}
                >
                  {loading && (
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                  )}
                  Check Eligibility
                </Button>
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MainNavigation;
