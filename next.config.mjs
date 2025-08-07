/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

module.exports = {
  // Force Next.js to use PORT env var
  server: {
    port: process.env.PORT || 8080,
    hostname: '0.0.0.0' // Required for Docker
  }
}