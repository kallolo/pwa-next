const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA({
  pwa: {
    disable: !isProd,
    dest: 'public',
    runtimeCaching,
  },
  env: {
    appName: 'NextJS'
  },
  async rewrites() { //konfigurasi Router
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/register',
        destination: '/auth/register',
      }
    ]
  }
});
