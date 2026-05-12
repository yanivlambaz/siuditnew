/** @type {import('next').NextConfig} */
const nextConfig = {
  // OneDrive + Windows: optimized image cache uses very long filenames under `.next/cache`
  // and can exceed MAX_PATH or confuse sync. Disable optimization only in that environment.
  images: {
    unoptimized:
      process.platform === "win32" && /onedrive/i.test(__dirname),
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
