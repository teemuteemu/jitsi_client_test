module.exports = {
  devServer: {
    proxy: {
      '^/http-bind': {
        target: 'http://localhost:8000',
        logLevel: 'debug',
        xfwd: true,
      },
    },
  },
}
