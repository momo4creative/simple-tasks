import {} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTaskContext } from "../../contexts/TaskContext";

export default function AddTasks() {
  // -----------
  const { ApiTask } = useTaskContext();

  const formik = useFormik({
    initialValues: { title: "" },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Tidak boleh kosong"),
    }),
    onSubmit: (values, actions) => {
      ApiTask.add(values).then((err) => {
        actions.setSubmitting(false);
        if (err) console.log(err.data);
      });
    },
  });

  // -----------
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="container bg-transparent border p-2"
          type="text"
          name="title"
          {...formik.getFieldProps("title")}
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 disabled:bg-gray-500"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
