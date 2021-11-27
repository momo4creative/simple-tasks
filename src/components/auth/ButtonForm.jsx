import React from "react";

export default function ButtonForm({ label, props, ...other }) {
  return (
    <button
      className="container p-2 bg-blue-900/75 rounded-full font-semibold tracking-wider disabled:bg-gray-700 hover:bg-blue-900"
      {...other}
      disabled={!props.isValid || props.isSubmitting}
    >
      {props.isSubmitting ? "proses..." : label}
    </button>
  );
}
