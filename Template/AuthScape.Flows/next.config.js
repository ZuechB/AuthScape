/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
      enableOEMClient: false,
      enableAuth: true,
      fallbackImageSrc: "/NoPhotoAvailable.jpg",
      websiteBaseUri: "http://localhost:3000"
    }
}

module.exports = nextConfig
