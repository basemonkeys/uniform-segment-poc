/** @type {import('next').NextConfig} */
const nextConfig = {
  // enables static site generation see unsupported features at https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features
  // TODO: npm run build is successful but output: "export" causes an error when running npm run dev.
  // output: "export",
  images: {
    remotePatterns: [
      {
        // TODO: remove this one in favor of Cloudinary images selected from Contentful
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful
      },
      // TODO: check this API url with the new API
      // this allows next Image component to display member cards from the SilverSneakers API
      {
        protocol: "https",
        hostname: "devapi.silversneakers.com",
      },
      {
        protocol: "https",
        hostname: "cdn.silversneakers.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  transpilePackages: ["jotai-devtools"],
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
};

module.exports = nextConfig;
