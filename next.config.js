/** @type {import('next').NextConfig} */
const nextConfig = {}
const path = require('path');


module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.resolve.alias['@app'] = path.join(__dirname, 'src/app');
      return config;
    }
};
