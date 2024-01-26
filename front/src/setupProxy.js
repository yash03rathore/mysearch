const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/completions',
    createProxyMiddleware({
      target: 'https://mysearch-tau.vercel.app/',
      changeOrigin: true,
    })
  );
};
