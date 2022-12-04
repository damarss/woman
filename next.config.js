const path = require('path')

module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
