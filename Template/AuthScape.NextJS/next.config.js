/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    env: {
        STAGE: 'development',
        WebsiteBaseUri: 'http://localhost:3000',
        APIURI: 'http://localhost:54218',
        AUTHORITYURI: 'https://localhost:44303',
        client_id: 'postman',
        client_secret: 'postman-secret',
        CompanyName: "My Company Name",
        stripePublicKey: "",
        cookieDomain: "localhost"
    }
}

module.exports = nextConfig
