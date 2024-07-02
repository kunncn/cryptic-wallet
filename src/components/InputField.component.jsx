import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import Label from "./Label.component";

const InputField = ({ formik, name, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <Label formik={formik} name={name} />
      <InputText
        className={classNames(
          "border-gray-400 hero-input",
          formik.touched[name] && formik.errors[name] ? "border-red-500" : ""
        )}
        id={name}
        name={name}
        type={type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        aria-describedby={`${name}-help`}
      />
    </div>
  );
};

export default InputField;
