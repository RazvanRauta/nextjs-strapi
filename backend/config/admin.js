module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '258279a58516552874b511e411e53b8f'),
  },
});
