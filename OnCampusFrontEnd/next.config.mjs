/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '**.me',
            port: '',
            pathname: '/**',
          },
        ],
      },
      webpack: (config) => {
        config.externals = [...config.externals, "canvas", "jsdom"];
        return config;
        },
};

export default nextConfig;
