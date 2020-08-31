module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "f7c5e97ed30e4cf09ca79f4d8c5292ab"),
    },
  },
});
