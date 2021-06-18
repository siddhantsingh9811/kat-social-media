'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const { create } = require('../../post/controllers/post');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async delete(ctx){
        const {id} = ctx.params;
        let entity;
        const [like] = await strapi.services.like.find({
          id: ctx.params.id,
          'author.id': ctx.state.user.id,
        });
    
        if(!like){
          return ctx.unauthorized("You can't delete this entry")
        }
    
        else{
          const entity = await strapi.services.like.delete({ id });
        }
        return sanitizeEntity(entity, { model: strapi.models.like });
        
    
      },
    async create(ctx){
        let entity
        const [like] = await strapi.services.like.find({
            'author.id': ctx.state.user.id,
            'post.id': ctx.request.body.post.id
          });
        if(!like){
            entity = await strapi.services.post.create(ctx.request.body)
        }

        else{
            return ctx.unauthorized("You already liked this")
        }
    }
};
