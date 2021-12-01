import { useEffect, useLayoutEffect, useState } from "react";
import { Loader } from "../../components/main";
import { FormAddTask, ListTask } from "../../components/tasks";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTaskContext } from "../../contexts/TaskContext";

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(true);

  const { tasks, setTasks, ApiTask } = useTaskContext();

  useEffect(() => {
    ApiTask.get().then((err) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold tracking-widest p-4 bg-blue-900">
        List Tasks
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : !tasks ? (
        <div>Tidak ada data</div>
      ) : (
        <ListTask />
      )}

      <FormAddTask />
    </div>
  );
}
