/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fesi6.s3.dualstack.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "*",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "*",
        hostname: "img1.kakaocdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
