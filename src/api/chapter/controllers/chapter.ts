/**
 * chapter controller
 */

import { factories } from "@strapi/strapi";

//const facto = factories.createCoreController("api::chapter.chapter");
export default factories.createCoreController(
  "api::chapter.chapter",
  ({ strapi }) => ({
    async create(ctx) {
      const { id } = ctx.params;
      const { role } = ctx.state.user;
      // if you don't want to hard code the ids, you can do a findOne for the id and do a check on the resto name.
      // Assuming id 4 corresponds to entry "The optimist"
      // Assuming id 5 corresponds to entry "The Negative"
      if (id === 1 && role.name !== "Author") {
        return ctx.badRequest("You are not allowed to create this entry", {
          id: id,
          role: role.name,
        });
      }

      console.log(ctx.Request.body);

      const entity = await strapi
        .service("api::chapter.chapter")
        .create({ data: ctx.Request.body });

      const response = await super.findOne(ctx);
      // const sanitizedEntity = await this.sanitizeOutput(response, ctx);
      // return this.transformResponse(sanitizedEntity);
      return response;
    },
  })
);
