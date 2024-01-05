/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['three'])
module.exports = {
  ...withTM(),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config
  }
}

// module.exports = withTM()
