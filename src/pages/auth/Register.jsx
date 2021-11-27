import {} from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import { InputForm, ButtonForm } from "../../components/auth";
import { SvgAuthentication } from "../../assets";
import { useAuthContext } from "../../contexts/AuthContext";

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tidak boleh kosong")
    .min(4, "Minimal 4 karakter !"),

  password: Yup.string()
    .required("Tidak boleh kosong")
    .min(4, "Minimal 4 karakter !"),

  confirmPassword: Yup.string()
    .required("Tidak boleh kosong")
    .oneOf([Yup.ref("password")], "Confirm password dan password harus sama !"),
});

export default function Register() {
  const { ApiAuth } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: registerSchema,

    onSubmit: (values, actions) => {
      // console.log(values);
      ApiAuth.register(values).then((err) => {
        console.log(err);
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
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, type: "spring" },
    },
  };

  //
  return (
    <section className="absolute top-0 left-0 z-10 w-full min-h-screen bg-gray-800">
      <motion.div
        variants={mainVariants}
        initial="hidden"
        animate="visible"
        className="w-5/6 mx-auto mt-4 space-y-8"
      >
        <div className="w-4/6 mx-auto">
          <img src={SvgAuthentication} alt="Svg Auth" />
        </div>
        <header className="text-4xl text-center">Register</header>
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

          <InputForm
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            props={formik}
          />

          <ButtonForm type="submit" label="Daftar" props={formik} />
        </form>

        <Link to="/login" className="block text-center">
          <span>Sudah punya akun ?</span>{" "}
          <span className="text-blue-300">Masuk disini !</span>
        </Link>
      </motion.div>
    </section>
  );
}
