/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "hw1k5c3g83.ufs.sh",
      },
    ],
  },
}

export default nextConfig
