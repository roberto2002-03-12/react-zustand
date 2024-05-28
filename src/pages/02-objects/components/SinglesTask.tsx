import { ITask } from "../../../interfaces";
import { IoReorderTwoOutline } from "react-icons/io5";
import { useTaskStore } from "../../../stores";

interface Props {
  task: ITask;
}

export const SingleTask: React.FC<Props> = ({ task }) => {
  const setDraggingTaskId = useTaskStore(state => state.setDraggingTaskId);

  return (
    <div 
      draggable={true}
      onDragStart={ () => setDraggingTaskId(task.id) }
      onDragEnd={ () => setDraggingTaskId(undefined) }
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">
          { task.title }
        </p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  )
}