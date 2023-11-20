import { UniformContext } from "@uniformdev/canvas-next-rsc";

export function UniformContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UniformContext>
    {children}</UniformContext>;
}
