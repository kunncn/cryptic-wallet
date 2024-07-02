import { useFormik } from "formik";
import * as Yup from "yup";
import { Card } from "primereact/card";
import ButtonComponent from "../components/Button.component";
import ContainerComponent from "../components/Container.component";
import PageTransitionComponent from "../components/PageTransition.component";
import { classNames } from "primereact/utils";
import { Link } from "react-router-dom";
import InputField from "../components/InputField.component";
import { register } from "../api/auth";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await register(values);
        if (result.success) {
          toast.current?.show({
            severity: "success",
            summary: "Registration Successful",
            detail: "You have registered successfully.",
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Registration Failed",
            detail: "Your registration failed. Please try again.",
          });
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Registration Failed",
          detail: "There was an error during registration.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <PageTransitionComponent>
        <ContainerComponent className="flex flex-col my-auto justify-center items-center">
          <Card
            pt={{
              body: {
                className: classNames(
                  "hero-mobile:px-[10px] hero-tablet:px-[20px] hero-tablet:py-[10px] hero-mobile:w-full hero-tablet:w-[400px]"
                ),
              },
              root: {
                className: classNames("shadow-2xl"),
              },
            }}
            className="md:w-25rem"
          >
            <div className="flex flex-col gap-[15px] mb-[25px]">
              <h1 className="font-poppins text-[27px] text-center text-black font-bold">
                Login Form
              </h1>
              <h2 className="font-poppins font-bold text-[13px] text-black text-center">
                Complete Your Info to signin your Account.
              </h2>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-[13px]"
            >
              <InputField formik={formik} name="email" />
              <InputField formik={formik} name="password" type="password" />
              <ButtonComponent
                type="submit"
                disabled={formik.isSubmitting}
                className={`w-full blue-btn rounded-lg flex justify-center md:block shadow-none border-none outline-none p-button p-component mt-[15px] p-button-rounded p-button-sm ${
                  !formik.isValid ? "pointer-events-none" : ""
                }`}
              >
                <i
                  className={
                    formik.isSubmitting
                      ? "pi pi-spinner text-[15px] me-2 animate-spin"
                      : undefined
                  }
                ></i>
                Submit
              </ButtonComponent>
              <p className="text-[13px] font-poppins text-black text-center">
                If you don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-primary font-poppins font-semibold text-[13px] underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </Card>
        </ContainerComponent>
      </PageTransitionComponent>
      <Toast ref={toast} />
    </div>
  );
};

export default LoginPage;
