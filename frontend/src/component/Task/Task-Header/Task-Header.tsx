import dateHelper from "moment/moment";
import { updatePlanService } from "@src/service";
import { TypedOnChange } from "@src/interface/common.interface";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { NoBgInput } from "@src/component";

import style from "./Task-Header.module.scss";

export function TaskHeader() {
   const { activePlan } = useAppSelector(state => state.planReducer);

   const { updatePlanFn } = updatePlanService();

   const dispatch = useAppDispatch();

   return (
      <div className={ style.TaskHeader }>

         { activePlan &&
            <>
               <NoBgInput type={ "text" }
                          style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                          id={ "title" }
                          value={ activePlan.title ? activePlan.title : "" }
                          onChange={ (event: TypedOnChange) => dispatch(planAction.updateTitle(event.target.value)) }
                          onBlur={ () => updatePlanFn(activePlan.id, activePlan.title) }/>
               <p className={ style.plan_date }> { dateHelper(activePlan.lastModified).format("DD-MM-YYYY  , HH:mm") } </p>
            </>
         }

      </div>
   );
}
