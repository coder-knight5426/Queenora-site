/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // WooCommerce / WordPress host
      {
        protocol: 'https',
        hostname: new URL(process.env.WP_URL || 'https://example.com').hostname,
      },
      // Common CDN fallbacks
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },
};

export default nextConfig;
