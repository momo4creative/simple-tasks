import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { ApiAuth } = useAuthContext();

  useLayoutEffect(() => {
    console.log("dari home");
    ApiAuth.get();
  }, []);

  return <div>Halaman home</div>;
}
