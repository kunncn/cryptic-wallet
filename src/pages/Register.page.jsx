import { useFormik } from "formik";
import * as Yup from "yup";
import { Card } from "primereact/card";
import ButtonComponent from "../components/Button.component";
import ContainerComponent from "../components/Container.component";
import PageTransitionComponent from "../components/PageTransition.component";
import { classNames } from "primereact/utils";
import { Link, useLocation } from "react-router-dom";
import InputField from "../components/InputField.component";
import { register } from "../api/auth";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRouteComponent } from "../components";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const RegisterPage = () => {
  const nav = useNavigate();
  const toast = useRef(null);
  const location = useLocation();
  const email = location.state?.email || "";

  const formik = useFormik({
    initialValues: {
      email,
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await register(values);
        console.log(result);
        if (result.success) {
          toast.current?.show({
            severity: "success",
            summary: "Registration Successful",
            detail: "You have registered successfully.",
            life: 1500,
          });
          setTimeout(() => nav("/auth/token/obtain"), 1800);
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Registration Failed",
            detail: result.msg || "Your registration failed. Please try again.",
            life: 1500,
          });
        }
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Registration Failed",
          detail: "There was an error during registration.",
          life: 1500,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ProtectedRouteComponent
      logic={localStorage.getItem("token")}
      to={"/dashboard"}
    >
      <div className="h-screen flex items-center justify-center w-screen">
        <Toast
          pt={{ detail: classNames("text-[15px]") }}
          position="top-center"
          ref={toast}
        />
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
                  Register Form
                </h1>
                <h2 className="font-poppins font-bold text-[13px] text-black text-center">
                  Complete Your Info to create your Account.
                </h2>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-[13px]"
              >
                <InputField formik={formik} name="email" />
                <InputField formik={formik} name="username" />
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
                  If you already have an account?{" "}
                  <Link
                    to="/auth/token/obtain"
                    className="text-primary font-poppins font-semibold text-[13px] underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </Card>
          </ContainerComponent>
        </PageTransitionComponent>
      </div>
    </ProtectedRouteComponent>
  );
};

export default RegisterPage;
