/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['robohash.org'] // add for test image data
  },
}

module.exports = nextConfig
