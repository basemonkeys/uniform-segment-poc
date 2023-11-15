import {
  type UniformPlaygroundProps,
  UniformPlayground,
} from "@uniformdev/canvas-next-rsc";
import { resolveComponent } from "@/components/index";

export default function PlaygroundPage(props: {
  searchParams: UniformPlaygroundProps["searchParams"];
}) {
  return <UniformPlayground {...props} resolveComponent={resolveComponent} />;
}
