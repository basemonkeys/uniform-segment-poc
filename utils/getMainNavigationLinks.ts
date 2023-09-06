import { cache } from "react";
import "server-only";

import {
  ComponentProps,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  getProjectMapClient,
  isDraftModeEnabled,
  isOnVercelPreviewEnvironment,
} from "@uniformdev/canvas-next-rsc";

type Props = Omit<ComponentProps, "component">;

export const preload = (context: Props) => {
  void getMainNavigationLinks(context);
};

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

export const getMainNavigationLinks = cache(async ({ context }: Props) => {
  const links =
    (await getProjectNodes({
      compositionId: context?.composition._id,
      searchParams: context?.searchParams,
    })) || [];

  return links;
});
