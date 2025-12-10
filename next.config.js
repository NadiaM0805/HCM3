/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure images to handle SVGs
  images: {
    // Allow SVG imports
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable image optimization for SVGs (they're already optimized)
    unoptimized: false,
  },
}

module.exports = nextConfig
