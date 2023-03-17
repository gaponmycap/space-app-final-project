import { useEffect, useState } from "react";

import { userActions } from "@src/redux/slice";
import { userRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { axiosInstance } from "@src/service";
import { IUser } from "@src/interface";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function getUserService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const [ isLoading, setIsLoading ] = useState<boolean>(true)

   const getUserFn = async () => {
      try {
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         dispatch(userActions.setInfo(data));

      } catch (e) {
         setIsLoading(false)
         message.error(errorCatherFn(e));

      } finally {
         setIsLoading(false)
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { getUserFn, isLoading };
}