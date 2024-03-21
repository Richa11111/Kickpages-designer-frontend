/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

module.exports = nextConfig
