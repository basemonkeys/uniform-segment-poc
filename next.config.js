/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // TODO: remove these for Cloudinary images
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // Contentful
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary
      },
    ],
  },
};

module.exports = nextConfig;
