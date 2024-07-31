import { useRef } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ButtonComponent from "./Button.component";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";

const ProfileComponent = () => {
  const toast = useRef(null);
  const nav = useNavigate();

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have logged out successfully.",
      life: 1300,
    });

    setTimeout(() => {
      localStorage.clear();
      nav("/auth/token/obtain");
    }, 1400);
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to log out?",
      header: "Confirmation",
      icon: "pi pi-sign-out",
      defaultFocus: "accept",
      accept,
    });
  };

  return (
    <div className="px-4 py-2 mx-auto max-w-[1350px] h-[84%] scrollbar-y-hide overflow-y-scroll flex justify-center items-start">
      <>
        <Toast position="top-center" ref={toast} />
        <ConfirmDialog
          pt={{
            acceptButton: {
              className: "blue-btn shadow-none",
            },
            rejectButton: {
              root: {
                className: "text-primary",
              },
            },
          }}
          className={classNames("w-[95%] max-w-[300px]")}
          draggable={false}
        />
        <ButtonComponent
          onClick={confirm1}
          className={`blue-btn px-6 hero-mobile:w-full hero-desktop:w-auto hero-mobile:justify-center rounded-md `}
        >
          Logout
        </ButtonComponent>
      </>
    </div>
  );
};

export default ProfileComponent;
