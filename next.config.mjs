/** @type {import('next').Next} */
const nextConfig = {
  // output: 'standalone',
  // experimental: {
  //   serverComponentsExternalPackages: ['@better-auth/kysely-adapter', 'kysely'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
};

export default nextConfig
