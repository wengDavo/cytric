/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.freepik.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com", // Add any other trusted image hosts here
      },
    ],
  },
};


export default nextConfig;
