import {} from "react";
import { useTaskContext } from "../../contexts/TaskContext";

export default function ListTask() {
  const { tasks, setTasks, ApiTask } = useTaskContext();

  //
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li className="bg-gray-900 p-2 flex justify-between items-start">
          <div className="container mx-2">
            {task.title} Lorem ipsum dolor sit amet.
          </div>
          <div className="space-x-2 flex">
            <button className="px-2 border">C</button>
            <button className="px-2 border">T</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
