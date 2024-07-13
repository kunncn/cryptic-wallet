import Avvvatars from "avvvatars-react";
import { Skeleton } from "primereact/skeleton";
import {
  ButtonComponent,
  ContainerComponent,
  HomeComponent,
  ProfileComponent,
  ProtectedRouteComponent,
  WalletComponent,
} from "../components";
import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cryptoWalletApi } from "../services/api";
import { useTokenVerifyQuery } from "../services/endpoints/auth.endpoints";

const DashboardPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [show, setShow] = useState("home");
  const { isLoading: tokenVerifyLoading, data: tokenVerifyData } =
    useTokenVerifyQuery();

  const logOutClickHandler = () => {
    localStorage.clear();
    nav("/auth/token/obtain");
  };

  useEffect(() => {
    return () => dispatch(cryptoWalletApi.util.resetApiState());
  }, [dispatch]);

  const onClickHandler = (event) => {
    confirmPopup({
      target: event.currentTarget,
      footer: <></>,
      message: (
        <div className="flex flex-col gap-1">
          <ButtonComponent className="w-full block rounded text-[11px] bg-white border-primary text-primary border font-poppins font-semibold">
            Update Profile
          </ButtonComponent>
          <ButtonComponent
            onClick={logOutClickHandler}
            className="w-full block rounded text-[11px] bg-primary font-poppins font-semibold"
          >
            Logout
          </ButtonComponent>
        </div>
      ),
    });
  };

  const iconClickHandler = (e) => {
    const name = e.currentTarget.getAttribute("name");
    setShow(name);
  };

  return (
    <ProtectedRouteComponent
      logic={!localStorage.getItem("auth")}
      to="/auth/token/obtain"
    >
      <div className="relative h-screen overflow-hidden">
        {show !== "profile" && (
          <>
            <ContainerComponent className="p-4 pb-2">
              <Toast className="w-fit" ref={toast} />
              <ConfirmPopup
                className="w-fit"
                pt={{
                  content: classNames("p-[10px] w-fit"),
                  message: classNames("m-0 w-fit"),
                }}
              />
              <div className="flex justify-start items-center">
                <ButtonComponent
                  onClick={onClickHandler}
                  className="p-0 w-fit h-fit bg-transparent"
                >
                  {tokenVerifyLoading ? (
                    <Skeleton shape="circle" size="32px" />
                  ) : (
                    <Avvvatars value={tokenVerifyData?.username} />
                  )}
                </ButtonComponent>
              </div>
            </ContainerComponent>
          </>
        )}
        {show === "home" && <HomeComponent />}
        {show === "wallet" && <WalletComponent />}
        {show === "profile" && <ProfileComponent />}
      </div>

      <div className="absolute bottom-0 px-4 w-full py-3 bg-white">
        <div className="flex justify-evenly items-center gap-[4px]">
          <i
            onClick={iconClickHandler}
            name="home"
            className={`pi pi-home text-[20px] text-center p-3 hover:cursor-pointer ${
              show === "home" && "text-primary"
            }`}
          ></i>
          <i
            name="wallet"
            onClick={iconClickHandler}
            className={`pi pi-wallet text-[20px] text-center p-3 hover:cursor-pointer ${
              show === "wallet" && "text-primary"
            }`}
          ></i>
          <i
            name="profile"
            onClick={iconClickHandler}
            className={`pi pi-user text-[20px] text-center p-3 hover:cursor-pointer ${
              show === "profile" && "text-primary"
            }`}
          ></i>
        </div>
      </div>
    </ProtectedRouteComponent>
  );
};

export default DashboardPage;
