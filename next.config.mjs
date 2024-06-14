/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
          },
          {
            protocol: 'https',
            hostname: 'ae01.alicdn.com',
          },
          {
            protocol: 'https',
            hostname: 'instagram.**',
          },
        ],
      },
};

export default nextConfig;
