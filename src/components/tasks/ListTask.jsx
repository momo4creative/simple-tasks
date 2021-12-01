import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useTaskContext } from "../../contexts/TaskContext";
import { SvgCheckCircle, SvgTrash } from "../Svgs";
import { Loader } from "../main";

export default function ListTask() {
  const { tasks, setTasks, ApiTask } = useTaskContext();

  const [checkLoad, setCheckLoad] = useState();
  const [trashLoad, setTrashLoad] = useState();

  const handleCheck = (id, value) => {
    // console.log(id, value);

    setCheckLoad(id);
    ApiTask.updateCheck(id, { completed: value }).then((err) => {
      setCheckLoad();
      console.log(err);
      if (!err) {
        const newTasks = tasks.map((task) => {
          if (task._id == id) task.completed = value;
          return task;
        });
        setTasks(newTasks);
      }
    });
  };

  const handleTrash = (id) => {
    setTrashLoad(id);
    ApiTask.delete(id).then((err) => {
      setTrashLoad();
      console.log(err);
      if (!err) {
        const newTasks = tasks.filter((task) => task._id != id);
        setTasks(newTasks);
      }
    });
  };

  //
  return (
    <ul className="space-y-2 px-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-gray-900 rounded-md p-2 flex justify-between items-start"
        >
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
                {checkLoad == task._id ? <Loader /> : <SvgCheckCircle />}
              </button>
              <button
                type="button"
                className="text-red-500"
                onClick={() => handleTrash(task._id)}
              >
                {trashLoad == task._id ? <Loader /> : <SvgTrash />}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
