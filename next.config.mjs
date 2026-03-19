/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  devIndicators: {
    buildActivity: false,
  },

  images: {
    domains: [],
  },

  webpack(config) {
    config.optimization.minimize = false;

    // ❗ Memory + disk save
    config.cache = false;

    // ❗ Browser bundle clean
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

export default nextConfig;
