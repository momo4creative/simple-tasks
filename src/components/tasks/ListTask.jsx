import {} from "react";
import { useTaskContext } from "../../contexts/TaskContext";

export default function ListTask() {
  const { tasks, ApiTask } = useTaskContext();

  const handleBtnCheck = (id, value) => {
    ApiTask.updateCheck(id, { completed: value });
    // console.log(id);
  };

  const handleBtnTrash = (id) => {
    // ApiTask.updateCheck(id);
    console.log(id);
  };
  // -----------
  if (tasks.length == 0) {
    return <div>Data Kosong</div>;
  }
  // console.log(tasks);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task._id}>
          <div className="flex p-2 border border-gray-700">
            <div
              className={`container ${task.completed ? "text-green-500" : ""}`}
            >
              {task.title}
            </div>
            {task.completed ? (
              <ButtonAction
                label="unCheck"
                onClick={() => handleBtnCheck(task._id, !task.completed)}
              />
            ) : (
              <div className="flex space-x-2">
                <ButtonAction
                  label="Check"
                  onClick={() => handleBtnCheck(task._id, !task.completed)}
                />
                <ButtonAction
                  label="Trash"
                  onClick={() => handleBtnTrash(task._id)}
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

const ButtonAction = ({ label, ...props }) => {
  return (
    <button
      className={`px-2 py-1 text-sm rounded-md ${
        label == "Check" ? "bg-green-500" : "bg-red-500"
      }`}
      {...props}
    >
      {label}
    </button>
  );
};
