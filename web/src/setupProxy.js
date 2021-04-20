const Proxy = require('http-proxy-middleware').createProxyMiddleware
const pythonAPI = 'http://39.107.90.140:9999/python/'
const javaAPI = 'http://39.107.90.140:8080/'

module.exports = function (app) {
    app.use(Proxy('/api', {
        target: javaAPI,
        secure: false,
        changeOrigin: true,
        pathRewrite: {"^/api": "/"},
    }))
    app.use(Proxy('/python', {
        target: pythonAPI,
        secure: false,
        changeOrigin: true,
        pathRewrite: {"^/python": "/"},
    }))
}