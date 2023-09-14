/** @type {import('next').NextConfig} */
const nextConfig = {
  // enables static site generation see unsupported features at https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features
  // TODO: npm run build is successful but output: "export" causes an error when running npm run dev.
  // output: "export",
  images: {
    remotePatterns: [
      {
        // TODO: remove this one in favor of Cloudinary images
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary
      },
    ],
    // TODO: not sure if this is neeeded since we have the above remotePatterns
    // https://nextjs.org/docs/app/api-reference/next-config-js/images#cloudinary
    // images: {
    //   loader: "custom",
    //   loaderFile: "./utils/imageLoader.js",
    // },
  },
};

module.exports = nextConfig;
