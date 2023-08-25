// TODO: this server component is currently limited because it prevents the use of components that require client side actions like useEffect of useState. Ideally, we would get this data on the server in `layout.tsx` then pass the data as a prop and migrate all of this code to Header.tsx. This would allow all MainNav actions to happen client side.

import {
  ComponentProps,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  getProjectMapClient,
  isDraftModeEnabled,
  isOnVercelPreviewEnvironment,
} from "@uniformdev/canvas-next-rsc";

// I also need to set an active class on the link, which requires client side rendering. https://www.slingacademy.com/article/how-to-highlight-currently-active-link-in-next-js/#Using_App_Router
import Link from "next/link";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// TODO: This is a server component by default. When importing NextUI via the @nextui-org/react package a useEffect on server error was thrown. Importing these NavBar components from the individual `navbar` package prevents this error. Eventually we will remove the full @nextui-org/react package in favor or only the individual components used
import { NavbarItem, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

type Props = ComponentProps;

export const getProjectNodes = async ({
  compositionId,
  searchParams,
}: {
  compositionId: string;
  searchParams?: { [key: string]: string | undefined };
}) => {
  const projectMapClient = getProjectMapClient();

  const draftMode = isDraftModeEnabled({
    searchParams,
  });
  const previewEnvironment = isOnVercelPreviewEnvironment();

  const { nodes: projectMapNodes } = await projectMapClient.getNodes({
    compositionId: compositionId,
    includeAncestors: true,
    state:
      draftMode || previewEnvironment
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  return projectMapNodes?.map((node) => ({
    name: node.name,
    path: node.path,
    type: node.type,
    isRoot: node.path === "/",
  }));
};

const MainNav = async ({ context }: Props) => {
  const links =
    (await getProjectNodes({
      compositionId: context?.composition._id,
      searchParams: context?.searchParams,
    })) || [];

  return (
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
                    className="p-5 flex gap-1 justify-between hover:bg-gray-200"
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
            <NavbarItem key={link?.path}>
              <Link href={link?.path} className="p-5 hover:bg-gray-200">
                {link.name}
              </Link>
            </NavbarItem>
          )}
        </>
      ))}
      <NavbarMenu>
        {links?.map((link: Types.ProjectMapLink, index: number) => (
          <NavbarMenuItem key={link?.path}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === links.length - 1
                  ? "danger"
                  : "foreground"
              }
              // className="w-full"
              href={link?.path}
            >
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </div>
  );
};

export default MainNav;
