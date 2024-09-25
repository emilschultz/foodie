/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '', // Leave blank if not needed
        pathname: '/**', // Matches all paths
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '', // Leave blank if not needed
        pathname: '/**', // Matches all paths
      },
    ],
  }
};

export default nextConfig;
