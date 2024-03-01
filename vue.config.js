const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/planbchannels/' : '/',
  devServer: {
    allowedHosts: 'all'
  },
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  },
  transpileDependencies: true
})