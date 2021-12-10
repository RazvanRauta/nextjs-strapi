module.exports = {
  projects: {
    app: {
      schema: ['schema.graphql'],
      documents: ['web-ui/src/graphql/**/*.{graphql}'],
      extensions: {
        endpoints: {
          default: {
            url: 'https://rr-strapi.herokuapp.com/graphql',
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
