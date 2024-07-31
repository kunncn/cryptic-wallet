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
import { useLoginMutation } from "../services/endpoints/auth.endpoints";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [mutate, { isLoading, error, data }] = useLoginMutation();
  const toast = useRef(null);
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const res = await mutate(values);
      if (res.error) {
        toast.current?.show({
          severity: "error",
          summary: "Registration Failed",
          detail: res.error.data?.detail || "Something went wrong.",
          life: 5000,
        });
      }
      if (res.data) {
        toast.current?.show({
          severity: "success",
          summary: "Registration Successful",
          detail: "You have logged in successfully.",
          life: 1500,
        });
        const token = res.data.access;
        localStorage.setItem("auth", token);
        localStorage.setItem("login", true);
        setTimeout(() => nav("/dashboard"), 1800);
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
                    " hero-tablet:px-[20px] hero-tablet:py-[10px] hero-mobile:w-full hero-tablet:w-[400px]"
                  ),
                },
                root: {
                  className: classNames("shadow-2xl"),
                },
              }}
              className="md:w-25rem"
            >
              <div className="flex flex-col gap-[15px] mb-[25px] relative">
                <Link
                  onClick={() => nav(-1)}
                  to="/"
                  className="absolute left-0 top-0"
                >
                  <i className="pi pi-arrow-left text-[13px] text-center p-3 bg-gray-100 rounded-full"></i>
                </Link>
                <h1 className=" text-[27px] text-center text-black font-bold">
                  Login Form
                </h1>
                <h2 className=" font-bold text-[13px] text-black text-center">
                  Complete Your Info to signin your Account.
                </h2>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-[13px]"
              >
                <InputField formik={formik} name="email" id={"loginEmail"} />
                <InputField
                  formik={formik}
                  name="password"
                  type="password"
                  id={"loginPassword"}
                />
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
                <p className="text-[13px]  text-black text-center">
                  If you don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-primary  font-semibold text-[13px] underline"
                  >
                    Register
                  </Link>
                </p>
                <Link
                  to="/auth/reset-password"
                  className="text-primary  font-semibold text-[12px] underline mx-auto w-fit block"
                >
                  Forgot Password?
                </Link>
              </form>
            </Card>
          </ContainerComponent>
        </PageTransitionComponent>
      </div>
    </ProtectedRouteComponent>
  );
};

export default LoginPage;
