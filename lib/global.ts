import { getCanvasClient } from "@uniformdev/canvas-next-rsc";

export const getGlobalComponent = async () => {
  // this is the ID of the Home composition which uses the HomePage component
  const globalCompositionId = "4562edb4-2801-4ebf-8f17-11b62a94a30a";

  const canvasClient = getCanvasClient({
    revalidate: 60,
  });

  const { composition: globalComponent } =
    await canvasClient.getCompositionById({
      compositionId: globalCompositionId,
    });

  return globalComponent;
};
