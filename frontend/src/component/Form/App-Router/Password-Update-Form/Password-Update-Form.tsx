import React, { type FC } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import toast, { Toaster } from "react-hot-toast";
import { type IUserDto } from "../../../../interface";
import { changePasswordValidator } from "../../../../validator/auth.validator";
import { FormControl } from "../../../UI/Form-Control/Form-Control";
import { type AxiosApiError, userService } from "../../../../services";
import { useNavigate } from "react-router-dom";

import style from "./Password-Update-Form.module.scss";

export const PasswordUpdateForm: FC = () => {
   const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Partial<IUserDto>>({
      resolver: joiResolver(changePasswordValidator),
      mode: "onTouched",
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<Partial<IUserDto>> = async (data): Promise<void> => {
      const newPassword = data.password;
      const currentPassword = data.current_password;
      const repeatPassword = data.repeat_password;

      try {
         if (newPassword === repeatPassword) {
            const loading = toast.loading("Зачекайте");

            await userService.changePassword(newPassword!, currentPassword!);

            toast.dismiss(loading);

            navigate("/change_password/message");

         } else {
            toast.error("Паролі не співпадають");
         }

      } catch (e) {
         const axiosError = e as AxiosApiError;
         const response = axiosError.response?.data.message as string;

         toast.dismiss();
         toast.error(response ? response : axiosError.message);
      }
   };

   return (
      <form className={ style.PasswordUpdateForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Toaster */ }
         <Toaster
            toastOptions={ {
               error: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#df8281",
                     secondary: "white",
                  },
               },
               success: {
                  style: {
                     textAlign: "center",
                  },
                  iconTheme: {
                     primary: "#84df81",
                     secondary: "white",
                  },
               },
            } }
         />

         {/* Form controls */ }
         <FormControl labelName={ "Введіть ваш поточний пароль" } fieldName={ "current_password" } register={ register }
                      errorMessage={ errors.current_password?.message } isPassword={ true }
         />

         <FormControl labelName={ "Введіть ваш новий пароль" } fieldName={ "password" } register={ register }
                      errorMessage={ errors.password?.message } isPassword={ true }
         />

         <FormControl labelName={ "Введіть пароль ще раз" } fieldName={ "repeat_password" } register={ register }
                      errorMessage={ errors.repeat_password?.message } isPassword={ true }
         />

         {/* Submit button */ }
         <button disabled={ !isValid }> Зберегти</button>

      </form>
   );
};
