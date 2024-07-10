import Avvvatars from "avvvatars-react";
import {
  ButtonComponent,
  ContainerComponent,
  HomeComponent,
  ProfileComponent,
  ProtectedRouteComponent,
  WalletComponent,
} from "../components";
import React, { useState } from "react";
import { Toast } from "primereact/toast";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRef } from "react";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const nav = useNavigate();
  const toast = useRef(null);
  const [show, setShow] = useState("home");

  const logOutClickHandler = () => {
    localStorage.removeItem("auth");
    nav("/auth/token/obtain");
  };

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
            <ContainerComponent className="p-4 pb-2 bg-red-500">
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
                  className="p-0 w-fit h-fit"
                >
                  <Avvvatars value="John Doe" />
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
            className={`${
              show === "home" && "text-primary"
            } pi pi-home text-[20px] text-center p-3 hover:cursor-pointer`}
          ></i>

          <i
            name="wallet"
            onClick={iconClickHandler}
            className={`pi ${
              show === "wallet" && "text-primary"
            }  pi-wallet text-[20px] text-center p-3 hover:cursor-pointer`}
          ></i>

          <i
            name="profile"
            onClick={iconClickHandler}
            className={`${
              show === "profile" && "text-primary"
            } pi pi-user text-[20px] text-center p-3 hover:cursor-pointer`}
          ></i>
        </div>
      </div>
    </ProtectedRouteComponent>
  );
};

export default DashboardPage;
