import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { cn } from "@/utils";

type AvailableColumnCount =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

type GridProps = ComponentProps<{
  columnsCount: AvailableColumnCount;
}>;

const getGridColumnsClass = (columnsCount: AvailableColumnCount) => {
  switch (columnsCount) {
    case "1":
      return "grid-cols-1";
    case "2":
      return "grid-cols-1 lg:grid-cols-2";
    case "3":
      return "grid-cols-1 lg:grid-cols-3";
    case "4":
      return "grid-cols-1 lg:grid-cols-4";
    case "5":
      return "grid-cols-1 lg:grid-cols-5";
    case "6":
      return "grid-cols-1 lg:grid-cols-6";
    case "7":
      return "grid-cols-1 lg:grid-cols-7";
    case "8":
      return "grid-cols-1 lg:grid-cols-8";
    case "9":
      return "grid-cols-1 lg:grid-cols-9";
    case "10":
      return "grid-cols-1 lg:grid-cols-10";
    case "11":
      return "grid-cols-1 lg:grid-cols-11";
    case "12":
      return "grid-cols-1 lg:grid-cols-12";
    default:
      return "grid-cols-1";
  }
};

export const Grid = ({ columnsCount, component, context }: GridProps) => (
  <div
    className={cn(
      "grid w-full auto-rows-max grid-cols-3 lg:gap-6",
      getGridColumnsClass(columnsCount),
    )}
  >
    <UniformSlot name="gridInner" data={component} context={context} />
  </div>
);

registerUniformComponent({
  type: "grid",
  component: Grid,
});
