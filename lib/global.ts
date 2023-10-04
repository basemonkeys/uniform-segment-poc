import { getCanvasClient } from "@uniformdev/canvas-next-rsc";

export const getGlobalComponent = async () => {
  // this is the Home composition
  const globalCompositionId = "26667348-5cd1-4185-b5a0-8413e1e87117";

  // projectId: c80de059-58e1-4794-8d39-4bf68836fde0
  // HeaderId:  f289a2bd-09f9-4e33-ae03-7a6136055ec6
  // FooterId:  d609f2f4-89fb-47d0-bdd9-8b19ec6bf77f

  const canvasClient = getCanvasClient({
    revalidate: 60,
  });

  const { composition: globalComponent } =
    await canvasClient.getCompositionById({
      compositionId: globalCompositionId,
    });

  return globalComponent;
};
