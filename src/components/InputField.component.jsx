import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import Label from "./Label.component";

const InputField = ({ formik, name, type = "text", value, id }) => {
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = (event) => {
    setTouched(true);
    formik.handleBlur(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      <Label formik={formik} name={name} />
      <div className="relative">
        <InputText
          className={classNames(
            "border-gray-400 hero-input w-full", // id
            touched && formik.errors[name] ? "border-red-500" : ""
          )}
          id={id}
          name={name}
          type={showPassword ? "text" : type}
          onChange={formik.handleChange}
          onBlur={handleBlur}
          value={(formik.values[name] = value || formik.values[name])}
          aria-describedby={`${name}-help`}
        />
        {type === "password" && (
          <i
            className={`pi ${
              showPassword ? "pi-eye-slash" : "pi-eye"
            } text-gray-500 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer`}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
