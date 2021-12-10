'use strict';

/**
 * news-post service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-post.news-post');
