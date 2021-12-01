import { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";

import { SvgPlus } from "../Svgs";
import { Loader } from "../main";
import { useTaskContext } from "../../contexts/TaskContext";

export default function FormAddTask() {
  const { setTasks, ApiTask } = useTaskContext();

  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: { title: "" },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("Tidak boleh kosong !")
        .min(4, "Minimal 4 karakter !"),
    }),
    onSubmit: (values, actions) => {
      //   console.log(values);
      ApiTask.add(values, (err, tasks) => {
        if (!err) {
          setIsOpen(false);
          actions.setSubmitting(false);
          actions.resetForm();
          setTasks((cur) => [tasks, ...cur]);
        }
      });
    },
  });

  //   console.log(formik);

  return (
    <motion.section
      className="fixed bottom-0 container flex justify-center"
      animate={isOpen ? { y: 0 } : { y: 80 }}
    >
      <button
        className="absolute -top-6 p-2 flex justify-center items-center group"
        onClick={() => setIsOpen((pre) => !pre)}
      >
        <span className="absolute w-8 h-8 group-hover:bg-blue-500 rounded-full filter blur-sm"></span>
        <div className="relative bg-gray-900 w-8 h-8 rounded-full flex justify-center items-center">
          <SvgPlus />
        </div>
      </button>

      <div className="container bg-gray-900 p-4 rounded-t-xl">
        <form className="mt-4 space-x-2 flex" onSubmit={formik.handleSubmit}>
          <textarea
            name="title"
            id="title"
            cols="30"
            rows="2"
            placeholder="Tugas baru"
            className={`container border border-transparent bg-gray-700 rounded-md px-4 ${
              formik.errors["title"] && "border-red-500"
            } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`}
            {...formik.getFieldProps("title")}
          ></textarea>

          {formik.errors["title"] && (
            <div className="absolute top-3 left-4 rounded-md px-2 text-sm bg-red-900">
              {formik.errors["title"]}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-700 px-2 rounded-md disabled:bg-gray-700"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? <Loader /> : "Tambah"}
          </button>
        </form>
      </div>
    </motion.section>
  );
}
