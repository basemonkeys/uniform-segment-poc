"use client";

import { UniformSlot } from "@uniformdev/canvas-next-rsc";

import {
  NavbarMenu,
  NavbarItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";

import { LinkProps, HeaderLink } from "../canvas/navigation/NavigationLink";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

const SSNavigationGroup = (props: LinkProps, children: any) => {
  // TODO: these props are wrong
  const { title, component, context } = props;
  console.log(props, "NavigationGroup Props");

  return (
    <>
      {/* this is the dropdown in the non-mobile navigation */}
      <Dropdown>
        <NavbarItem key={title}>
          <DropdownTrigger>
            <Button
              disableRipple
              endContent={<ChevronDownIcon className="w-5" />}
              className="flex justify-between gap-1 bg-transparent p-0 px-3 py-5 hover:bg-default-hover"
            >
              {title}
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="Silver Sneakers Features"
          className="w-[340px]"
          itemClasses={{
            base: "gap-4 text-primary data-[hover=true]:bg-default-hover",
            description: "!text-gray-600 !text-sm",
          }}
        >
          {/* TODO: this is breaking the dropdown */}
          {/* <UniformSlot name="subNavItems" data={component} context={context} /> */}
          {children}
          {/* <DropdownItem title={title} description={description} /> */}
          {/* <UniformSlot name="subNavItems" data={component} context={context}>
            {({ key, component }) => {
              const { title, description } = component;
              return (
                <DropdownItem
                  key={key}
                  title={title}
                  description={description}
                />
              );
            }}
          </UniformSlot> */}
        </DropdownMenu>
      </Dropdown>

      {/* this is the dropdown mobile menu */}
      <NavbarMenu className="">
        <Dropdown>
          <NavbarItem key={title}>
            <DropdownTrigger>
              <Button
                disableRipple
                endContent={<ChevronDownIcon className="w-5" />}
                className="flex justify-between gap-1 bg-transparent p-0 px-3 py-5 hover:bg-default-hover"
              >
                {title}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4 text-primary data-[hover=true]:bg-default-hover",
              description: "!text-gray-600 !text-sm",
            }}
          >
            {/* <UniformSlot name="subNavItems" data={component} context={context}>
              {({ key, component }) => {
                return (
                  <DropdownItem
                    key={key}
                    title={title}
                    description={description}
                  />
                );
              }}
            </UniformSlot> */}
            {/* <DropdownItem title={title} description={description} /> */}
          </DropdownMenu>
        </Dropdown>
        <HeaderLink {...props} />
      </NavbarMenu>
    </>
  );
};

export default SSNavigationGroup;
