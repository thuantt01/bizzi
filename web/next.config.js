const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  swcMinify: true,
  reactStrictMode: true,
  env: {
    GATEWAY_API_URL: process.env.GATEWAY_API_URL,
  },
};

module.exports = nextConfig;
