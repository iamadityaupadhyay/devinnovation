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
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID, // Example for other env vars
  },
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.yourdomain.com', // Add your CDN domain
      'res.cloudinary.com',
      'plus.unsplash.com' // Common image hosting
    ],
    
    

  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
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

// Security headers configuration
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src 'self' blob: data: *.unsplash.com *.yourdomain.com;
  font-src 'self' *.gstatic.com;
  connect-src 'self' *.google-analytics.com *.api.yourdomain.com;
  media-src 'self';
  frame-src 'self' *.youtube.com;
`;

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim() },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

module.exports = withPWA(nextConfig);