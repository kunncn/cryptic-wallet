import React from "react";
import { classNames } from "primereact/utils";

const Label = ({ formik, name }) => {
  const touched = formik.touched;
  const errors = formik.errors;

  return (
    <label
      className={classNames(
        "font-poppins font-semibold text-[12px]",
        touched[name] && errors[name] ? "text-red-500" : "text-black"
      )}
      htmlFor={name}
    >
      {touched[name] && errors[name]
        ? errors[name].toString()
        : `${name.charAt(0).toUpperCase() + name.slice(1)}`}
    </label>
  );
};

export default Label;
