// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // external images (e.g., Google thumbnails)
      "localhost",                  // local images if needed
      // "res.cloudinary.com",       // add other image hosts if you use cloud storage
    ],
  },
};

export default nextConfig;
