"use client";

import {
  UniformSlot,
  UniformSlotProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import {
  NavbarMenu,
  NavbarItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import {
  LinkProps,
  HeaderLink,
  FooterLink,
} from "../canvas/navigation/NavigationLink";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

const SSNavigationGroup = (props: LinkProps, children: any) => {
  const { title, component, context } = props;
  // console.log(props, "NavigationGroup Props");

  const SSDropdown: UniformSlotProps<string>["wrapperComponent"] = ({
    items,
  }) => {
    return items.map((item: any, index) => {
      const { title, description } = item;
      return (
        <DropdownItem key={index} title={title} description={description} />
      );
    });
  };

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
          <UniformSlot
            name="subNavItems"
            data={component}
            context={context}
            wrapperComponent={SSDropdown}
          />
          {/* TODO: this throws an li within an li error because both DropdownItem and UniformSlot produce <li> */}
          {/* <DropdownItem>
            <UniformSlot
              name="subNavItems"
              data={component}
              context={context}
            />
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

      {/* this is the dropdown mobile menu */}
      <NavbarMenu className="">
        <NavbarItem key={title}>
          <Accordion
            itemClasses={{
              base: "",
              heading: "",
              titleWrapper: "",
              title: "text-base text-primary font-normal",
              content: "",
              subtitle: "text-gray-500 text-sm",
              trigger: "",
              startContent: "",
              indicator: "text-primary text-xl",
            }}
          >
            <AccordionItem
              key="1"
              aria-label={title}
              title={title}
              subtitle="This is a subtitle"
            >
              {title}
            </AccordionItem>
          </Accordion>
        </NavbarItem>
        {/* <HeaderLink {...props} /> */}
      </NavbarMenu>
    </>
  );
};

// It seems that we have to register these components here and in indes.tsx
registerUniformComponent({
  type: "navigationLink",
  component: HeaderLink,
});

registerUniformComponent({
  type: "navigationLink",
  component: HeaderLink,
  variantId: "header",
});

registerUniformComponent({
  type: "navigationLink",
  component: FooterLink,
  variantId: "footer",
});

export default SSNavigationGroup;
