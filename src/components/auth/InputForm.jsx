import React from "react";

export default function InputForm({ label, props, ...others }) {
  //   console.log(props);
  return (
    <article>
      <input
        className={`container p-2 px-6 text-lg bg-gray-900 rounded-full border ${
          props.errors[others.name] && props.touched[others.name]
            ? "border-red-600"
            : "border-transparent"
        } focus:outline-none focus:border-transparent focus:ring-1 focus:ring-blue-900`}
        autoComplete="off"
        placeholder={label}
        {...others}
        {...props.getFieldProps(others.name)}
      />

      {props.errors[others.name] && props.touched[others.name] && (
        <div className="text-red-500 text-sm text-center">
          {props.errors[others.name]}
        </div>
      )}
    </article>
  );
}
