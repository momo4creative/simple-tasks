import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

import { InputForm, ButtonForm } from "../../components/auth";
import { SvgAuthentication } from "../../assets";
import { useAuthContext } from "../../contexts/AuthContext";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Tidak boleh kosong"),
  password: Yup.string().required("Tidak boleh kosong"),
});

export default function Login() {
  const { isAuth, ApiAuth } = useAuthContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: (values, actions) => {
      // console.log(values);
      ApiAuth.login(values).then((err) => {
        if (err) {
          actions.setFieldError(err.param, err.msg);
        }
        actions.setSubmitting(false);
      });
    },
  });

  const mainVariants = {
    hidden: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, type: "spring" },
    },
    exit: {
      x: "-100vw",
    },
  };
  //

  useEffect(() => {
    ApiAuth.get("login");
  }, []);

  //
  return (
    <section className="absolute top-0 left-0 z-10 w-full min-h-screen bg-gray-800">
      <motion.div
        // transition={{du}}
        variants={mainVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-5/6 mx-auto mt-4 space-y-8"
      >
        <div className="w-4/6 mx-auto">
          <img src={SvgAuthentication} alt="Svg Auth" />
        </div>
        <header className="text-4xl text-center">Login</header>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <InputForm
            type="text"
            label="Username"
            name="username"
            props={formik}
          />

          <InputForm
            type="password"
            label="Password"
            name="password"
            props={formik}
          />

          <ButtonForm type="submit" label="Masuk" props={formik} />
        </form>

        <Link to="/register" className="block text-center">
          <span>Belum punya akun ?</span>{" "}
          <span className="text-blue-300">Daftar disini !</span>
        </Link>
      </motion.div>
    </section>
  );
}
