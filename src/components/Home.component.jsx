import { Button } from "primereact/button";
import ContainerComponent from "./Container.component";
import Avvvatars from "avvvatars-react";
import { useWalletDetailQuery } from "../services/endpoints/wallet.endpoint";
import { Skeleton } from "primereact/skeleton";

const HomeComponent = () => {
  const {
    data: walletDetailData,
    isLoading: walletDetailLoading,
    refetch: refetchWalletDetail,
  } = useWalletDetailQuery(null, { skip: !localStorage.getItem("auth") });

  return (
    <>
      <ContainerComponent className="px-4 py-2 ">
        <div>
          <div className=" flex justify-between items-center">
            <div className="flex flex-col gap-[2px]">
              <h2 className=" text-[14px] text-gray-500">Your Balance</h2>
              <h3 className=" text-[24px] font-semibold flex items-center">
                {walletDetailLoading ? (
                  <Skeleton height="34.5px" width="70px" />
                ) : (
                  parseFloat(walletDetailData?.balance || 0).toFixed(1)
                )}
              </h3>
            </div>
            <div className="flex gap-[10px]">
              <Button className="bg-primary shadow-none rounded-full p-3 border-none">
                <i className="pi pi-send"></i>
              </Button>
              <Button className="bg-primary shadow-none rounded-full p-3 border-none">
                <i className="pi pi-plus"></i>
              </Button>
            </div>
          </div>
        </div>
      </ContainerComponent>
      <ContainerComponent className="px-4 py-2  h-[74%] scrollbar-y-hide overflow-y-scroll">
        <div className="flex flex-col gap-[10px]">
          <h1 className=" text-[14px] text-gray-500">Transactions History</h1>
          <h1 className=" text-[13px] text-black"> 12/12/2022</h1>
          <div className="flex justify-between items-center gap-[10px] bg-gray-50 rounded-sm p-[10px]">
            <div>
              <Avvvatars value="John Doe" size={32} />
            </div>
            <div className=" max-w-max min-w-[100px]">
              <p className=" text-[10px] text-gray-500">Recipient</p>
              <p className=" text-[10px] text-gray-500 truncate">
                TQfutVkuRVTLSWDkwF117mKEyUniTnBbgc
              </p>
            </div>
            <div>
              <div>
                <p className=" text-[10px] text-end text-gray-500">Amount</p>
                <p className=" text-[12px] font-bold text-end text-gray-500">
                  500
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
};

export default HomeComponent;
