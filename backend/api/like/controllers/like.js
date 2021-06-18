'use strict';

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
          entity = await strapi.services.like.create(data,{files});
    
        }
        else {
          ctx.request.body.author = ctx.state.user.id;

          entity = await strapi.services.like.create(ctx.request.body)
        }
        return sanitizeEntity(entity, { model: strapi.models.like });
      },
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
      count(ctx) {
        const post = ctx.request.body.post;
        const user = 	ctx.request.body.user;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        console.log({"post":post,"user":user});
        
        
      },
      
}; 
