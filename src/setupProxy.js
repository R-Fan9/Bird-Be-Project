const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/interview',
    createProxyMiddleware({
      target: 'https://web-lai64u320-bird-and-be.vercel.app',
      changeOrigin: true,
    })
  );
};