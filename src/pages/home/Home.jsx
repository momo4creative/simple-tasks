import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/main";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tasks");
    // console.log("dari home");
    // ApiAuth.get();
  }, []);

  return (
    <div className="">
      <div className="flex justify-center text-blue-500">
        <Loader />
      </div>
      <div> Halaman home</div>
    </div>
  );
}
