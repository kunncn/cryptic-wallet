import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "./Button.component";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      navigate("/auth/register", { state: { email: values.email } });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex hero-mobile:gap-[10px] hero-desktop:gap-[30px] items-center justify-center hero-desktop:justify-start hero-mobile:flex-col hero-desktop:flex-row">
        <div className="flex flex-col gap-[0px] relative">
          <InputText
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={classNames(
              "font-poppins text-black hero-input h-fit w-full",
              {
                "p-invalid": formik.touched.email && formik.errors.email,
              }
            )}
          />
          <div className="absolute top-full ">
            {formik.touched.email && formik.errors.email ? (
              <small className="p-error hero-mobile:invisible hero-tablet:visible">
                {formik.errors.email}
              </small>
            ) : (
              <small className="invisible">Placeholder</small>
            )}
          </div>
        </div>
        <ButtonComponent
          className={`blue-btn px-6 scale-110 hero-mobile:w-full hero-desktop:w-auto hero-mobile:justify-center   ${
            !formik.isValid && "pointer-events-none"
          }`}
          rounded={false}
          disabled={formik.isSubmitting}
          type="submit"
        >
          <i
            className={
              formik.isSubmitting
                ? "pi pi-spinner text-[15px] me-2 animate-spin"
                : undefined
            }
          ></i>
          Register
        </ButtonComponent>
      </div>
    </form>
  );
};

export default FormComponent;
