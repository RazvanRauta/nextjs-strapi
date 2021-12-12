module.exports = {
  projects: {
    app: {
      schema: ['schema.graphql'],
      documents: ['web-ui/src/graphql/**/*.{graphql}'],
      extensions: {
        endpoints: {
          default: {
            url: 'http://localhost:1337/graphql',
            headers: {
              'user-agent': 'JS GraphQL',
            },
            introspect: false,
          },
        },
      },
    },
  },
};
