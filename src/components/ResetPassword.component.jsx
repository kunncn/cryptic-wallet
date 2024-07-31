import { useFormik } from "formik";
import * as Yup from "yup";
import { Card } from "primereact/card";
import ButtonComponent from "../components/Button.component";
import ContainerComponent from "../components/Container.component";
import PageTransitionComponent from "../components/PageTransition.component";
import { classNames } from "primereact/utils";
import { Link } from "react-router-dom";
import InputField from "../components/InputField.component";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRouteComponent } from "../components";
import logo from "../assets/logo.png";
import { useRequestPasswordMutation } from "../services/endpoints/auth.endpoints";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  otp: Yup.string()
    .min(6, "OTP must be at least 6 characters")
    .max(6, "Invalid OTP")
    .required("OTP is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const ResetPasswordComponent = ({ setShowOtp, email }) => {
  const nav = useNavigate();
  const [mutate, { isLoading, error, data }] = useRequestPasswordMutation();
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const res = await mutate(values);
      if (res.error) {
        toast.current?.show({
          severity: "error",
          summary: "Password Reset Failed",
          detail: res.error.data?.message,
          life: 5000,
        });
      }
      if (res.data) {
        toast.current?.show({
          severity: "success",
          summary: "Password Reset Successful",
          detail: "Password has been reset successfully.",
          life: 1500,
        });
        setTimeout(() => {
          nav("/auth/token/obtain");
        }, 1800);
      }
      setSubmitting(false);
    },
  });

  return (
    <ProtectedRouteComponent
      logic={localStorage.getItem("auth")}
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
                    "hero-tablet:px-[20px] hero-tablet:py-[10px] hero-mobile:w-full hero-tablet:w-[400px]"
                  ),
                },
                root: {
                  className: classNames("shadow-2xl"),
                },
              }}
              className="md:w-25rem"
            >
              <div className="flex flex-col gap-[15px] mb-[25px]">
                <h1 className=" text-[27px] text-center text-black font-bold">
                  <Link to="/">
                    <img
                      src={logo}
                      alt="cryptic wallet logo"
                      className="w-[290px] block mx-auto"
                    />
                  </Link>
                </h1>
                <h2 className=" font-semibold text-[13px] text-gray-500">
                  Enter the Email address associated with your account and we'll
                  send you a OTP to reset your password.
                </h2>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-[13px]"
              >
                <InputField
                  formik={formik}
                  name="email"
                  value={email}
                  id={"resetPasswordEmail"}
                />
                <InputField
                  formik={formik}
                  name="otp"
                  id={"resetPasswordOtp"}
                />
                <InputField
                  formik={formik}
                  name="password"
                  type="password"
                  id={"resetPasswordPassword"}
                />
                <ButtonComponent
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`w-full blue-btn rounded-lg flex justify-center md:block shadow-none border-none outline-none p-button p-component mt-[15px] p-button-rounded p-button-sm ${
                    formik.isValid ? "" : "pointer-events-none"
                  }`}
                >
                  <i
                    className={
                      formik.isSubmitting
                        ? "pi pi-spinner text-[15px] me-2 animate-spin"
                        : undefined
                    }
                  ></i>
                  Continue
                </ButtonComponent>
                <p className="text-[13px]  text-black text-center">
                  Remember your password?{" "}
                  <Link
                    to="/auth/token/obtain"
                    className="text-primary  font-semibold text-[13px] underline"
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

export default ResetPasswordComponent;
