import Avvvatars from "avvvatars-react";
import { useGetTransactionHistoryQuery } from "../services/endpoints/transaction.endpoints";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import notWalletFound from "../assets/wallet-not-found.svg";
import { useCreateWalletMutation } from "../services/endpoints/wallet.endpoint";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import format from "date-fns/format";

const TransactionComponent = () => {
  const [createWallet, { isLoading: createWalletLoading }] =
    useCreateWalletMutation();
  const { data, isLoading, isError } = useGetTransactionHistoryQuery();
  const toast = useRef(null);
  console.log(data);

  const handleCreateWallet = async (createWallet) => {
    const res = await createWallet();
    if (res?.data) {
      localStorage.setItem("created", true);
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Wallet Created Successfully",
        life: 1500,
      });
    }
  };

  if (isError) {
    return (
      <div className="px-4 py-2 mx-auto max-w-[1350px]  scrollbar-y-hide overflow-y-scroll flex flex-col justify-center items-start h-full">
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <img src={notWalletFound} alt="not wallet found" />
          <h1 className=" text-[20px] text-black">No Wallet Found</h1>
          <Button
            className={classNames(
              "bg-primary scale-90 shadow-none outline-none flex justify-center w-fit px-[15px]"
            )}
            onClick={() => {
              handleCreateWallet(createWallet);
            }}
            disabled={createWalletLoading}
          >
            {createWalletLoading ? "Creating Wallet..." : "Create Wallet"}
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[10px] mb-auto">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-[10px] bg-gray-50 rounded-sm p-[10px]"
          >
            <div>
              <Skeleton height="32px" width="32px" shape="circle" />
            </div>
            <div className="max-w-max min-w-[100px]">
              <p className="text-[10px] text-gray-500">Recipient</p>
              <p className="text-[10px] text-gray-500 truncate">
                <Skeleton height="16px" width="200px" />
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Amount</p>
              <p className="text-[10px] text-gray-500">
                <Skeleton height="16px" width="40px" />
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex justify-center items-center text-[18px] h-full">
        <h1>You don't have any transactions</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <Toast position="top-center" ref={toast} />

      {data?.map((item) => (
        <div
          key={item.timestamp}
          className="flex justify-between bg-gray-50 rounded-sm p-[10px] items-center gap-[10px] "
        >
          <div>
            <Avvvatars value={item.recipient} size={32} />
          </div>
          <div className="max-w-max min-w-[100px]">
            <p className="text-[10px] text-gray-500">Recipient</p>
            <p className="text-[10px] text-gray-500 truncate">
              {item.recipient}
            </p>
          </div>
          <div>
            <h1 className="text-[10px] text-end mb-[1px]  text-gray-500">
              {format(new Date(item.timestamp), "dd/MM/yyyy")}
            </h1>
            <p className="text-[10px] text-gray-500 text-end ">Amount</p>
            <p className="text-[11px] text-gray-500 font-semibold text-end">
              {parseFloat(item.amount).toFixed(1)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionComponent;
