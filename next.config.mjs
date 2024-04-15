// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      dns: false,
      net: false,
      tls: false,
      "pg-native": false,
    };

    return config;
  },
};

export default nextConfig;
