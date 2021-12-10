module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('POSTGRES_HOST', '127.0.0.1'),
      port: env.int('POSTGRES_PORT', 5432),
      database: env('POSTGRES_DB', 'strapi'),
      user: env('POSTGRES_USER', 'strapi'),
      password: env('POSTGRES_PASSWORD', 'strapi'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ssl: false
    },
    debug: true,
  },
})