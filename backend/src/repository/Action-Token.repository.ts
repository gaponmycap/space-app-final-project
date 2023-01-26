import { type FilterQuery } from "mongoose";
import { type IActionTokenDatabase, type IActionTokenSchema } from "../interface";
import { ActionTokenModel } from "../model";
import { ApiError } from "../error/Api.error";

export const ActionTokenRepository = {

   create: async (body: IActionTokenSchema): Promise<IActionTokenDatabase> => {
      return ActionTokenModel
         .create(body)
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },

   deleteOne: async (filter: FilterQuery<IActionTokenSchema>): Promise<IActionTokenDatabase | null> => {
      return ActionTokenModel
         .findOneAndDelete(filter)
         .catch(e => {
            console.log(e);
            throw ApiError.Database();
         });
   },


};