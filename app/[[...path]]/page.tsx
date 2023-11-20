import {
  type PageParameters,
  retrieveRoute,
  createServerUniformContext,
  UniformComposition,
  ContextUpdateTransfer
} from "@uniformdev/canvas-next-rsc";
import { resolveComponent } from "@/components/index";

import Script from 'next/script';
import * as snippet from '@segment/snippet';




function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
    page: true,
  };
  return process.env.NODE_ENV === 'development' ? snippet.max(opts) : snippet.min(opts);
}

// Uncomment to statically render routes at build time
//export { generateStaticParams } from '@uniformdev/canvas-next-rsc';

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props);
  const serverContext = await createServerUniformContext({
    searchParams: props.searchParams, 
  });
  
  return (
    <><Script id="segment-script" dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
    
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: {
            'country': 'US',
          }
        }}
      />

      <UniformComposition
        {...props}
        resolveComponent={resolveComponent}
        route={route}
        mode="static"
      />
      
    </>
    
  );
}
