import { TaskItem } from "@src/component";
import { useAppSelector } from "@src/hook";

import style from "./Task-List.module.scss";

export function TaskList() {
   const { tasks } = useAppSelector(state => state.taskReducer);

   return (
      <div className={ style.TaskList }>
         { tasks && tasks.map(task => (
            <TaskItem key={ task.id } task={ task }/>
         )) }
      </div>
   );
}
