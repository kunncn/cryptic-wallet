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
import { useRequestOtpMutation } from "../services/endpoints/auth.endpoints";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const RequestOtpComponent = ({ setShowOtp, setEmail }) => {
  const [mutate, { isLoading, error, data }] = useRequestOtpMutation();
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const res = await mutate(values);
      if (res.error) {
        toast.current?.show({
          severity: "error",
          summary: "Request Failed",
          detail: res.error.data?.message,
          life: 5000,
        });
      }
      if (res.data) {
        toast.current?.show({
          severity: "success",
          summary: "Request Successful",
          detail: "OTP sent to your email.",
          life: 1500,
        });
        setEmail(values.email);
        setTimeout(() => {
          setShowOtp(false);
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
                <InputField formik={formik} name="email" />
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
                  Continue
                </ButtonComponent>
                <p className="text-[13px]  text-black text-center">
                  If you don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-primary  font-semibold text-[13px] underline"
                  >
                    Register
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

export default RequestOtpComponent;
