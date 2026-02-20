/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow picsum.photos images in Next.js Image component (optional)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },

   reactStrictMode: false,
  // Transpile three.js and related packages for Next.js
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig
