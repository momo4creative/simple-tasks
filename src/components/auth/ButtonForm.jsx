import React from "react";
import { Loader } from "../main";

export default function ButtonForm({ label, props, ...other }) {
  return (
    <button
      className="container flex justify-center p-2 bg-blue-900/75 rounded-full font-semibold tracking-wider disabled:bg-gray-700 hover:bg-blue-900"
      {...other}
      disabled={!props.isValid || props.isSubmitting}
    >
      {props.isSubmitting ? (
        <>
          <div className="text-blue-500 h-6 w-6">
            <Loader />
          </div>
          <span className="ml-2">proses...</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
