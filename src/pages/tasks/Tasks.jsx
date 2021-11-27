import { useLayoutEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTaskContext } from "../../contexts/TaskContext";

export default function Tasks() {
  const navigate = useNavigate();
  const { ApiAuth } = useAuthContext();
  const { ApiTask } = useTaskContext();

  useLayoutEffect(() => {
    console.log("dari tasks");
    ApiAuth.get();
    ApiTask.getAll();
  }, []);

  return (
    <div className="p-4">
      <div className="p-4 text-xl">Daftar Task</div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
