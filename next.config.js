/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,

  // emotion 설정
  compiler: {
    emotion: true,
  },
  // images: {
  //   domains: [],
  // },
};

module.exports = nextConfig;
