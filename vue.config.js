const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/SimonGame/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/style.scss";`
      }
    }
  }
})
