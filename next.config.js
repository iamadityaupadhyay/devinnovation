/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  
  
  
});

const nextConfig = {
  reactStrictMode: true,
  
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.yourdomain.com', // Add your CDN domain
      'res.cloudinary.com',
      'plus.unsplash.com',
      'unsplash.com',
      '*' // Common image hosting
    ],
    
    

  },
  async headers() {
    return [
      
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'Content-Type', value: 'application/xml' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ];
  },
};




module.exports = withPWA(nextConfig);