import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/main";
import { useToastContext } from "../../contexts/ToastContext";

export default function Home() {
  const navigate = useNavigate();

  const { toast } = useToastContext();

  useEffect(() => {
    // navigate("/tasks");
    // console.log("dari home");
    // ApiAuth.get();
    // ShowMessage("success", "hohooho");
    // setTimeout(() => {
    //   ShowMessage("error", "kikiasdskdklasldkl");
    // }, 3000);
    toast.success("ok bro");
    toast.success("ok broasd");
    toast.success("ok broasasdd");
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
