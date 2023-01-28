import * as jwt from "jsonwebtoken";
import { ApiError } from "../error/Api.error";
import { type IAccessTokenPair } from "../interface";
import { config } from "../config";

export const accessTokenPairGenerator = (userId: string): IAccessTokenPair => {
   try {
      return {
         accessToken: jwt.sign({ userId }, config.SECRET_ACCESS_TOKEN_KEY, { expiresIn: "1d" }),
         refreshToken: jwt.sign({ userId }, config.SECRET_REFRESH_TOKEN_KEY, { expiresIn: "7d" }),
      };
   } catch (e) {
      throw new ApiError("Помилка при генеруванні токена", 500);
   }
};
