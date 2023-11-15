import {
  type PageParameters,
  retrieveRoute,
  UniformComposition,
} from "@uniformdev/canvas-next-rsc";
import { resolveComponent } from "@/components/index";

// Uncomment to statically render routes at build time
// export { generateStaticParams } from '@uniformdev/canvas-next-rsc';

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props);
  return (
    <UniformComposition
      {...props}
      resolveComponent={resolveComponent}
      route={route}
      // this is the setting for SSR and Edge-side rendering
      // for the static mode (SSG) use mode="static"
      mode="server"
    />
  );
}
