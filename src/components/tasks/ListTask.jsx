import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useTaskContext } from "../../contexts/TaskContext";
import { SvgCheckCircle, SvgTrash } from "../Svgs";
import { Loader } from "../main";

export default function ListTask() {
  const { tasks, setTasks, ApiTask } = useTaskContext();

  const [checkLoad, setCheckLoad] = useState(false);
  const [trashLoad, setTrashLoad] = useState(false);

  const handleCheck = (id, value) => {
    setCheckLoad(true);
    ApiTask.updateCheck(id, value).then((err) => {
      setCheckLoad(false);
    });
  };

  const handleTrash = (id) => {
    setTrashLoad(true);
    ApiTask.delete(id).then((err) => {
      setTrashLoad(false);
    });
  };

  //
  return (
    <ul className="space-y-2 px-4">
      {tasks.map((task) => (
        <li className="bg-gray-900 rounded-md p-2 flex justify-between items-start">
          <div className="container mx-2">
            <div className={`text-lg ${task.completed && "text-green-500"}`}>
              {task.title}
            </div>

            <div className="text-sm text-gray-500">
              {formatDistanceToNow(
                new Date(task.completed ? task.updatedAt : task.createdAt),
                {
                  addSuffix: true,
                }
              )}
            </div>
          </div>

          {task.completed ? (
            <div className="text-gray-500 italic">Done</div>
          ) : (
            <div className="space-x-2 flex">
              <button
                type="button"
                className="text-green-500"
                onClick={() => handleCheck(task._id, !task.completed)}
              >
                {checkLoad ? <Loader /> : <SvgCheckCircle />}
              </button>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleTrash(task._id)}
              >
                {trashLoad ? <Loader /> : <SvgTrash />}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
