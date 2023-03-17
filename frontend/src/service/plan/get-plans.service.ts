import { useEffect } from "react";

import { IPlans } from "@src/interface";
import { axiosInstance } from "@src/service";
import { plansRequests } from "@src/config/configuration";
import { useDebounce } from "@src/hook";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function getPlansService() {
   const { searchKey, total } = useAppSelector(state => state.planReducer);
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const debounced = useDebounce(searchKey);

   const getPlansFn = async () => {
      try {
         dispatch(planAction.setIsLoading(true))
         const { data } = await axiosInstance.get<IPlans>(plansRequests.getAllPlans, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });

         dispatch(planAction.setPlans(data));

      } catch (e) {
         dispatch(planAction.setIsLoading(false))
         message.error(errorCatherFn(e));

      } finally {
         dispatch(planAction.setIsLoading(false))
      }
   };

   useEffect(() => {
      getPlansFn();
   }, [ debounced, total ]);

}