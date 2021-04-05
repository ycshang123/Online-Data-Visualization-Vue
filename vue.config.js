module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 9999,
        https: false,
        open: true,
        hotOnly: true
    },
    outputDir: './dist',
    assetsDir: './assets/',
    publicPath: './',
    indexPath: './index.html',
    transpileDependencies: ['vuetify']
}
