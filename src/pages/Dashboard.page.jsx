import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { classNames } from "primereact/utils";
import Avvvatars from "avvvatars-react";
import { cryptoWalletApi } from "../services/api";
import { useTokenVerifyQuery } from "../services/endpoints/auth.endpoints";
import {
  ButtonComponent,
  ContainerComponent,
  HomeComponent,
  ProfileComponent,
  ProtectedRouteComponent,
  WalletComponent,
} from "../components";

const logOutClickHandler = (nav) => {
  localStorage.clear();
  nav("/auth/token/obtain");
};

const IconComponent = ({ name, show, setShow }) => (
  <i
    onClick={() => setShow(name)}
    name={name}
    className={`pi pi-${name} text-[20px] text-center p-3 hover:cursor-pointer ${
      show === name && "text-primary"
    }`}
  ></i>
);

const DashboardPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState("home");
  const { isLoading: tokenVerifyLoading, data: tokenVerifyData } =
    useTokenVerifyQuery(null, { skip: !localStorage.getItem("auth") });

  useEffect(() => {
    return () => dispatch(cryptoWalletApi.util.resetApiState());
  }, [dispatch]);

  return (
    <ProtectedRouteComponent
      logic={!localStorage.getItem("auth")}
      to="/auth/token/obtain"
    >
      <div className="relative h-screen overflow-hidden">
        {show !== "user" && (
          <ContainerComponent className="p-4 pb-2">
            <Toast className="w-fit" />
            <ConfirmPopup
              className="w-fit"
              pt={{
                content: classNames("p-[10px] w-fit"),
                message: classNames("m-0 w-fit"),
              }}
            />
            <div className="flex justify-start items-center">
              <ButtonComponent className="p-0 w-fit h-fit bg-transparent">
                {tokenVerifyLoading ? (
                  <Skeleton shape="circle" size="32px" />
                ) : (
                  <Avvvatars value={tokenVerifyData?.username} />
                )}
              </ButtonComponent>
            </div>
          </ContainerComponent>
        )}
        {show === "home" && <HomeComponent />}
        {show === "wallet" && <WalletComponent />}
        {show === "user" && <ProfileComponent />}
      </div>

      <div className="absolute bottom-0 px-4 w-full py-3 bg-white">
        <div className="flex justify-evenly items-center gap-[4px]">
          <IconComponent name="home" show={show} setShow={setShow} />
          <IconComponent name="wallet" show={show} setShow={setShow} />
          <IconComponent name="user" show={show} setShow={setShow} />
        </div>
      </div>
    </ProtectedRouteComponent>
  );
};

export default DashboardPage;
