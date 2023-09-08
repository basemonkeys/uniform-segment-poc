import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import Header from "../Header";
// import MainNavigation from "../MainNavigation";

import { getMainNavigationLinks } from "@/utils/getMainNavigationLinks";

export async function Page(props: ComponentProps) {
  const { component, context } = props || {};

  const links = getMainNavigationLinks;
  // console.log(links);

  return (
    <>
      {/* <Header>
        <MainNavigation />
      </Header> */}
      {/* <Header links={links}></Header> */}
      <Header />
      <main className="main">
        <UniformSlot name="banners" data={component} context={context} />
        <UniformSlot name="content" data={component} context={context} />
      </main>
      {/* TODO: should the footer live in Uniform for business users to manage? */}
      {/* https://docs.uniform.app/docs/get-started/starters/component-starter-kit#configure-global-template */}
      <footer className="pb-5 text-center font-bold">
        This is the footer!!!
      </footer>
    </>
  );
}

registerUniformComponent({
  type: "page",
  component: Page as any,
});
