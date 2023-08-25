// A layout.js and page.js file can be defined in the same folder. The layout will wrap the page.

import {
  ComponentProps,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  getProjectMapClient,
  isDraftModeEnabled,
  isOnVercelPreviewEnvironment,
} from "@uniformdev/canvas-next-rsc";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../globals.css";

// Import all Uniform Canvas Components
import "../../components/canvas";

import Header from "../../components/Header";

type Props = Omit<ComponentProps, "component">;
type RootProps = {
  children: React.ReactNode;
};

type PageProps = Props & RootProps;

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

// TODO: context is undefined. This data needs to be fetched on server then passed to Header as a prop/
const getMainNav = async ({ context }: Props) => {
  const links =
    (await getProjectNodes({
      compositionId: context?.composition._id,
      searchParams: context?.searchParams,
    })) || [];

  return links;
};

export default async function PageLayout({
  children,
  context,
  ...props
}: PageProps) {
  const links = await getMainNav(context);

  return (
    <>
      <Header links={links} />
      <main className="main">{children}</main>
      {/* TODO: This is a placeholder but ... some Tailwind styles are not accessible here, like text color and padding.
          This must be related to themeing. Maybe this will not be an issue once Footer component is styled. */}
      <footer className="text-center font-bold py-24">
        This is the footer!!!
      </footer>
    </>
  );
}
