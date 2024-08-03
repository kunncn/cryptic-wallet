import { useRef, useState, useEffect } from "react";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ButtonComponent from "./Button.component";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import { Calendar } from "primereact/calendar";
import { useUpdateProfileMutation } from "../services/endpoints/profile.endpoints";

const ProfileComponent = () => {
  const calendarRef = useRef(null);
  const toast = useRef(null);
  const nav = useNavigate();
  const [username, setUserName] = useState(null);
  const [date, setDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const userName = useSelector((state) => state.userInfo.username);
  const dob = useSelector((state) => state.userInfo.date_of_birth);
  const [mutate, { isLoading, error, data }] = useUpdateProfileMutation();

  useEffect(() => {
    setUserName(userName);
    setDate(new Date(dob));
  }, [userName, dob]);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have logged out successfully.",
      life: 1300,
    });

    setTimeout(() => {
      localStorage.clear();
      localStorage.setItem("logout", true);
      nav("/auth/token/obtain", { replace: true });
    }, 1400);
  };

  const logoutConfirmHandler = () => {
    confirmDialog({
      message: "Are you sure you want to log out?",
      header: "Confirmation",
      icon: "pi pi-sign-out",
      defaultFocus: "accept",
      accept,
    });
  };

  const updateProfileHandler = async () => {
    const formattedDate = date
      ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0]
      : null;
    const res = await mutate({ username, date_of_birth: formattedDate });
    if (res.error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          res.error.data?.message ||
          "Failed to update your profile. Please try again.",
        life: 5000,
      });
    } else if (res.data) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Your profile has been updated successfully.",
        life: 1500,
      });
      setUserName(username);
      setDate(new Date(dob));
      setVisible(false);
    }
  };

  return (
    <div className="px-4 py-2 mx-auto max-w-[1350px] h-[84%] scrollbar-y-hide overflow-y-scroll flex flex-col justify-start gap-2">
      <>
        <Toast position="top-center" ref={toast} />
        <ConfirmDialog
          dismissableMask={true}
          pt={{
            acceptButton: {
              className: "blue-btn shadow-none py-2",
            },
            rejectButton: {
              root: {
                className: classNames("hidden"),
              },
            },
          }}
          className={classNames("w-[95%] max-w-[300px]")}
          draggable={false}
        />
        <Dialog
          pt={{
            headerTitle: {
              className: "text-[18px]",
            },
          }}
          dismissableMask={true}
          className="w-[95%] max-w-[300px] bg-white"
          draggable={false}
          header="Update Your Information"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-4">
              <p className="text-[13px] text-gray-500 text-nowrap">
                User Name:
              </p>
              <div className="w-full">
                <InputText
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-1 shadow-none border-gray-500 w-full hover:border-primary active:border-primary"
                  placeholder="Update your name"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-4">
              <p className="text-[13px] text-gray-500 text-nowrap">
                Date Of Birth:
              </p>
              <div className="w-full">
                <Calendar
                  ref={calendarRef}
                  dateFormat="yy/mm/dd"
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  pt={{
                    input: {
                      root: {
                        className: classNames(
                          "shadow-none hover:border-primary p-1 h-[34.5px] focus:border-primary active:border-primary border-gray-500"
                        ),
                      },
                    },
                  }}
                />
              </div>
            </div>
            <ButtonComponent
              disabled={!username || !date || isLoading}
              onClick={updateProfileHandler}
              className={`blue-btn hero-mobile:w-full hero-desktop:w-auto hero-mobile:justify-center rounded-md ms-auto max-w-fit py-2 px-4 ${
                isLoading && "cursor-not-allowed"
              } ${(!username || !date) && "cursor-not-allowed"} `}
            >
              Save
            </ButtonComponent>
          </div>
        </Dialog>
        <ButtonComponent
          onClick={() => setVisible(true)}
          className={`blue-btn px-4 hero-mobile:w-full hero-desktop:w-auto hero-mobile:justify-center rounded-md `}
        >
          Update Profile
        </ButtonComponent>
        <ButtonComponent
          onClick={logoutConfirmHandler}
          className={`blue-btn text-primary !bg-white !border-solid !border border-primary px-4 py-2 hero-mobile:w-full hero-desktop:w-auto hero-mobile:justify-center rounded-md `}
        >
          Logout
        </ButtonComponent>
      </>
    </div>
  );
};

export default ProfileComponent;
