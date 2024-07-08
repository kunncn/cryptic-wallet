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
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useRef } from "react";
import { classNames } from "primereact/utils";

const DashboardPage = () => {
  const toast = useRef(null);
  const [show, setShow] = useState("home");

  const btnClickHandler = (e) => {
    const name = e.currentTarget.getAttribute("name");
    setShow(name);
  };

  const onClickHandler = (event) => {
    console.log(toast.current);
    confirmPopup({
      target: event.currentTarget,
      footer: <></>,
      message: (
        <div className="flex flex-col gap-1">
          <ButtonComponent className="w-full block rounded text-[11px] bg-white border-primary text-primary border font-poppins font-semibold">
            Update Profile
          </ButtonComponent>
          <ButtonComponent className="w-full block rounded text-[11px] bg-primary font-poppins font-semibold">
            Logout
          </ButtonComponent>
        </div>
      ),
    });
  };

  const iconClickHandler = (e) => {
    e.stopPropagation();
    btnClickHandler(e);
  };

  return (
    <ProtectedRouteComponent
      logic={!localStorage.getItem("auth")}
      to="/auth/token/obtain"
    >
      <div className="relative h-screen">
        <ContainerComponent className="p-4 pb-2">
          {show !== "profile" && (
            <>
              <Toast className="w-fit" ref={toast} />
              <ConfirmPopup
                className="w-fit"
                pt={{
                  content: classNames("p-[10px] w-fit"),
                  message: classNames("m-0 w-fit"),
                }}
              />
              <div className="flex justify-start items-center">
                <Button
                  onClick={onClickHandler}
                  className="shadow-none border-none outline-none w-fit p-0 bg-transparent rounded-full"
                >
                  <Avvvatars onClick={onClickHandler} value="John Doe" />
                </Button>
              </div>
            </>
          )}
        </ContainerComponent>
        {show === "home" && <HomeComponent />}
        {show === "wallet" && <WalletComponent />}
        {show === "profile" && <ProfileComponent />}
      </div>

      <div className="absolute bottom-0 px-4 w-full">
        <div className="flex justify-evenly items-center pb-2 gap-[4px]">
          <Button
            onClick={btnClickHandler}
            name="home"
            className="bg-transparent w-full text-gray-500 flex justify-center shadow-none p-3 border-none focus-visible:text-primary focus-within:text-primary hover:text-primary rounded-none"
          >
            <i
              onClick={iconClickHandler}
              name="home"
              className="pi pi-home text-[20px] text-center"
            ></i>
          </Button>
          <Button
            onClick={btnClickHandler}
            name="wallet"
            className="bg-transparent w-full text-gray-500 flex justify-center shadow-none p-3 border-none focus-visible:text-primary focus-within:text-primary hover:text-primary rounded-none"
          >
            <i
              name="wallet"
              onClick={iconClickHandler}
              className="pi pi-wallet text-[20px] text-center"
            ></i>
          </Button>
          <Button
            onClick={btnClickHandler}
            name="profile"
            className="bg-transparent w-full text-gray-500 flex justify-center shadow-none p-3 border-none focus-visible:text-primary focus-within:text-primary hover:text-primary rounded-none"
          >
            <i
              name="profile"
              onClick={iconClickHandler}
              className="pi pi-user text-[20px] text-center"
            ></i>
          </Button>
        </div>
      </div>
    </ProtectedRouteComponent>
  );
};

export default DashboardPage;
