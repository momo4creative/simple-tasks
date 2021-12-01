import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Loader } from "../../components/main";
// import { useToastContext } from "../../contexts/ToastContext";

export default function Home() {
  const navigate = useNavigate();

  // const { toast } = useToastContext();

  useEffect(() => {
    navigate("/tasks");
  }, []);

  return (
    <div className="">
      <div className="flex justify-center text-blue-500">
        {/* <Loader /> */}
      </div>
      <div> Halaman home</div>
    </div>
  );
}
