module.exports = {
  devServer: {
    proxy: {
      '^/http-bind': {
        target: 'http://localhost:8000',
        // changeOrigin: true,
        logLevel: 'debug',
        xfwd: true,
        ws: true,
      },
    },
  },
}
