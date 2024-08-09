import Avvvatars from "avvvatars-react";
import { useGetTransactionHistoryQuery } from "../services/endpoints/transaction.endpoints";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import notWalletFound from "../assets/wallet-not-found.svg";
import { useCreateWalletMutation } from "../services/endpoints/wallet.endpoint";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import format from "date-fns/format";
import { Dialog } from "primereact/dialog";

const TransactionComponent = () => {
  const [createWallet, { isLoading: createWalletLoading }] =
    useCreateWalletMutation();
  const {
    data: transactionHistory,
    isLoading,
    isError,
    isSuccess,
  } = useGetTransactionHistoryQuery();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const handleCreateWallet = async (createWallet) => {
    const res = await createWallet();
    if (res?.transactionHistory) {
      localStorage.setItem("created", true);
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Wallet Created Successfully",
        life: 1500,
      });
    }
  };

  const showDetailHandler = (item) => {
    setDetailItem(item);
    setVisibleDetail(true);
  };

  if (isError) {
    return (
      <div className="px-4 py-2 mx-auto max-w-[1350px] scrollbar-y-hide overflow-y-scroll flex flex-col justify-center items-start h-full">
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <img src={notWalletFound} alt="not wallet found" />
          <h1 className="text-[20px] text-black">No Wallet Found</h1>
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
              <Skeleton height="15px" width="60px" />
              <p className="text-[10px] text-gray-500 text-end">Amount</p>
              <p className="text-[10px] text-gray-500">
                <Skeleton className="ms-auto" height="16px" width="40px" />
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isSuccess) {
    if (transactionHistory?.length === 0) {
      return (
        <div className="flex justify-center text-center items-center text-[18px] h-full">
          <h1 className="text-gray-500">You don't have any transactions</h1>
        </div>
      );
    }

    const visibleTransactions = transactionHistory.slice(0, 6);
    const showSeeMore = transactionHistory.length > 6;

    return (
      <div className="flex flex-col gap-[10px]">
        <Toast position="top-center" ref={toast} />
        <Dialog
          draggable={false}
          dismissableMask={true}
          header="Transaction History"
          visible={visible}
          maximizable
          style={{ width: "90vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-col gap-[10px]">
            {transactionHistory.map((item) => (
              <div
                key={item.timestamp}
                className="flex justify-between bg-gray-50 rounded-sm p-[10px] items-center gap-[10px]"
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
                  <h1 className="text-[10px] text-end mb-[1px] text-gray-500">
                    {format(
                      new Date(item.timestamp),
                      "HH:mm:ss dd/MMM/yyyy EEEE"
                    )}
                  </h1>
                  <p className="text-[10px] text-gray-500 text-end">Amount</p>
                  <p className="text-[11px] text-gray-500 font-semibold text-end">
                    {parseFloat(item.amount).toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          dismissableMask={true}
          header="Transaction Detail"
          visible={visibleDetail}
          maximizable
          style={{ width: "90vw" }}
          onHide={() => setVisibleDetail(false)}
        >
          <div className="flex flex-col gap-[10px] h-full justify-center">
            {detailItem && (
              <div className="bg-gray-50 rounded-sm p-[10px] flex flex-col gap-3 items-center">
                <div className="flex justify-center">
                  <Avvvatars value={detailItem.recipient} size={50} />
                </div>
                <div className="max-w-[300px] w-full flex flex-col gap-3">
                  <div className="flex justify-between">
                    <p className="font-bold text-[12px] text-gray-500">
                      Recipient
                    </p>
                    <p className="font-bold text-[12px] max-w-[69px] text-gray-500 truncate">
                      {detailItem.recipient}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-[12px] text-gray-500">
                      Amount
                    </p>
                    <p className="font-bold text-[12px] max-w-[69px] text-gray-500 truncate">
                      {parseFloat(detailItem.amount).toFixed(1)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-[12px] text-gray-500">Hash</p>
                    <p className="font-bold text-[12px] max-w-[69px] text-gray-500 truncate">
                      {detailItem.transaction_hash}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[12px] text-gray-500">Time</p>
                    <div className="text-end">
                      <p className="font-bold text-[12px] text-gray-500">
                        {format(new Date(detailItem.timestamp), "HH:mm")}
                      </p>
                      <p className="font-bold text-[12px] text-gray-500">
                        {format(new Date(detailItem.timestamp), "dd/MMM/yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog>

        {visibleTransactions.map((item) => (
          <div
            key={item.timestamp}
            className="flex justify-between bg-gray-50 rounded-sm p-[10px] items-center gap-[10px]"
            onClick={() => showDetailHandler(item)} // Logs the transaction details on click
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
              <h1 className="text-[10px] text-end mb-[1px] text-gray-500 text-nowrap">
                {format(new Date(item.timestamp), "dd/MMM/yyyy")}
              </h1>
              <p className="text-[10px] text-gray-500 text-end">Amount</p>
              <p className="text-[11px] text-gray-500 font-semibold text-end">
                {parseFloat(item.amount).toFixed(1)}
              </p>
            </div>
          </div>
        ))}

        {showSeeMore && (
          <div className="flex justify-center mt-[10px]">
            <a
              onClick={() => setVisible(true)}
              className="text-blue-500 text-[12px] font-semibold cursor-pointer"
            >
              See More
            </a>
          </div>
        )}
      </div>
    );
  }
};

export default TransactionComponent;
