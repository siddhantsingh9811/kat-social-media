'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx){
    let entity; 
    if (ctx.is("multipart")){
      const {data,files} = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.coment.create(data,{files});

    }
    else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.comment.create(ctx.request.body)
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
  
  async delete(ctx){
    const {id} = ctx.params;
    let entity;
    const [comment] = await strapi.services.comment.find({
      id: ctx.params.id,
      'author.id': ctx.state.user.id,
    });

    if(!comment){
      return ctx.unauthorized("You can't delete this entry")
    }

    else{
      const entity = await strapi.services.comment.delete({ id });
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
    

  }
};
