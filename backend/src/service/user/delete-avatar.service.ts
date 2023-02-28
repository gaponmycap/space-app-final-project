import { UserRepository } from "../../repository";
import path from "node:path";
import { unlink } from "fs/promises";
import { fileNameValidator } from "../../validator";
import { ApiException } from "../../exception/api.exception";
import { UserDocument } from "../../model";
import { STATIC_PATH } from "../../constant/static-path.constant";

export const deleteAvatarService = async (userId: UserDocument["id"], body: { fileName: string }): Promise<void> => {

   // Validation
   const validation = fileNameValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Delete avatar from DB
   await UserRepository.findByIdAndUpdate(userId, { avatar: "" });

   // Delete image from hard drive
   const imagePath = path.join(STATIC_PATH, body.fileName);
   await unlink(imagePath).catch(() => {
      throw new ApiException("No such image or directory", 500);
   });

};