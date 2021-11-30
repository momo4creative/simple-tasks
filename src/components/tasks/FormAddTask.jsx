import {} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { SvgPlus } from "../Svgs";
import { Loader } from "../main";
import { useTaskContext } from "../../contexts/TaskContext";

export default function FormAddTask() {
  const { setTasks, ApiTask } = useTaskContext();

  const formik = useFormik({
    initialValues: { title: "" },
    validationSchema: Yup.object().shape({
      title: Yup.string().required().min(4, "Minimal 4 karakter"),
    }),
    onSubmit: (values, actions) => {
      //   console.log(values);
      ApiTask.add(values, (err, tasks) => {
        if (!err) {
          actions.setSubmitting(false);
          actions.resetForm();
          setTasks((cur) => [tasks, ...cur]);
        }
      });
    },
  });

  //   console.log(formik);

  return (
    <section className="fixed bottom-0 container flex justify-center">
      <button className="absolute -top-4 p-2 bg-gray-900/50 rounded-full">
        <SvgPlus />
      </button>

      <div className="container bg-gray-900 p-4">
        <form
          className="mt-4 space-x-2 flex h-10"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            name="title"
            id="title"
            className={`container bg-gray-700 rounded-md px-4 ${
              formik.errors["title"] && "border border-red-500"
            } focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-none`}
            placeholder="Tugas baru"
            {...formik.getFieldProps("title")}
          />

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
    </section>
  );
}
