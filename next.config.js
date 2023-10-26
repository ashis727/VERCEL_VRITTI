/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com" ,'vritti-bucket.s3.amazonaws.com'],
      
  },
  eslint: {
    ignoreDuringBuilds: true
},
};

module.exports = nextConfig
