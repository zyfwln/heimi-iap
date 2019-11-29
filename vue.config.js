module.exports = {
    baseUrl: './',
    devServer: {
        port: 6999,
        proxy: {
            '/': {
                target: 'http://employeetest.heymisoft.com',
                changeOrigin: true,
                WS: false
            }
        }
    }
}