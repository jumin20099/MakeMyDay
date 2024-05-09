const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://graph.instagram.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/oauth/access_token',
    createProxyMiddleware({
      target: 'https://api.instagram.com', // Instagram API로 요청을 전달
      changeOrigin: true,
    })
  );

  app.use(
    '/callback/instagram',
    createProxyMiddleware({
      target: 'https://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/callback/instagram': '' }
    })
  );

};
