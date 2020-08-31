module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: env("DATABASE_CLIENT", "mysql"),
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "example"),
        username: env("DATABASE_USERNAME", "example"),
        password: env("DATABASE_PASSWORD", "example"),
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
});
