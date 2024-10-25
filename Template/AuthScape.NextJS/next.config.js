const path = require('path')

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({    
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
  },
  experimental: {
    appDir: true,
  },
  images: {
      domains: ["localhost:3000"]
  },
  publicExcludes: ["!robots.txt", "!static"],
  env: {
      companyName: "AuthScape",
      logo: "",
      stripePublicKey: "",
      stage: "development",
      googleAnalytics4: "",
      microsoftClarityTrackingCode: "",
      client_id: "postman",
      client_secret: "postman-secret",
      apiUri: "http://localhost:54218",
      authorityUri: "https://localhost:44303",
      cookieDomain: "localhost",
      enableOEMClient: "false",
      enableDatabaseAnalytics: "true",
      fallbackImageSrc: "/NoPhotoAvailable.jpg",
      websiteBaseUri: "http://localhost:3000"
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
        },
        // {
        //   key: 'Content-Security-Policy',
        //   value: "script-src 'self' unsafe-inline *.yourdomain.com localhost
        // },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        }]
      }
    ]
  },
  output: "standalone"
});