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
      'author.id': ctx.state.user.id,
    });

    if(!like){
      return ctx.unauthorized("You can't delete this entry")
    }

    else{
      const entity = await strapi.services.like.delete({ id });
    }
    return "unliked post";
      
    
  },
  async create(ctx){
    let entity; 
    const [like] = await strapi.services.like.find({
      'post.id': ctx.request.body.post,
      'author.id': ctx.state.user.id,
    });
    if(!like){

      if (ctx.is("multipart")){
        const {data,files} = parseMultipartData(ctx);
        data.author = ctx.state.user.id;
        entity = await strapi.services.like.create(data,{files});
        
      }
      else {
        ctx.request.body.author = ctx.state.user.id;
        entity = await strapi.services.like.create(ctx.request.body)
      }
    }
    else{
      return ctx.unauthorized("You already liked this")
    }
    return sanitizeEntity(entity, { model: strapi.models.like });
  }
};
