import { Button } from "primereact/button";
import { useWalletDetailQuery } from "../services/endpoints/wallet.endpoint";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useRef, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ButtonComponent from "./Button.component";
import { useDispatch } from "react-redux";
import { setAddress } from "../features/userSlice";
import { useSelector } from "react-redux";
import { usePostTransactionMutation } from "../services/endpoints/transaction.endpoints";
import TransactionComponent from "./Transaction.component";

const HomeComponent = () => {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [receiveVisible, setReceiveVisible] = useState(false);
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const address = useSelector((state) => state.userInfo.address);
  const [receiveAddress, setReceiveAddress] = useState("");
  const { data: walletDetailData, isLoading: walletDetailLoading } =
    useWalletDetailQuery(null, { skip: !localStorage.getItem("auth") });
  const [postTransaction, { isLoading: postTransactionLoading }] =
    usePostTransactionMutation();

  useEffect(() => {
    if (walletDetailData) {
      dispatch(setAddress(walletDetailData.address));
      setReceiveAddress(address);
    }
  }, [walletDetailData, dispatch, address]);

  const transferHandler = async () => {
    const res = await postTransaction({
      recipient: cryptoAddress,
      amount: Number(amount),
    });

    if (!res?.error) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Transaction Successful",
        life: 1300,
      });
      setTimeout(() => setVisible(false), 1500);
    }

    if (res?.error) {
      let errorMessage = "An unexpected error occurred";
      let severity = "error";

      toast.current.show({
        severity,
        summary: "Transaction Failed",
        detail: res.error.data.message || errorMessage,
        life: 3000,
      });
    }
  };

  const receiveHandler = () => {
    toast.current.show({
      severity: "success",
      summary: "Address Copied",
      detail: "Successfully copied",
      life: 1000,
    });
  };

  return (
    <>
      <div className="px-4 py-2">
        <div>
          <Toast position="top-center" ref={toast} />
          <Dialog
            dismissableMask={true}
            className="w-[95%] max-w-[300px] bg-white"
            draggable={false}
            header="Send Crypto"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-4">
                <p className="text-[13px] text-gray-500">Recipient:</p>
                <div className="w-full">
                  <InputText
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    className="p-1 shadow-none border-gray-500 w-full truncate"
                    placeholder="enter crypto address"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <p className="text-[13px] text-gray-500">Amount:</p>
                <div className="w-full">
                  <InputText
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-1 shadow-none border-gray-500 w-full"
                    placeholder="enter amount"
                  />
                </div>
              </div>
              <ButtonComponent
                disabled={postTransactionLoading || !amount || !cryptoAddress}
                className="blue-btn rounded-md ms-auto max-w-fit py-2 px-4"
                onClick={transferHandler}
              >
                Send
              </ButtonComponent>
            </div>
          </Dialog>

          {/* Receive Crypto Dialog */}
          <Dialog
            dismissableMask={true}
            className="w-[95%] max-w-[300px] bg-white"
            draggable={false}
            header="Receive Crypto"
            visible={receiveVisible}
            onHide={() => setReceiveVisible(false)}
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center gap-4">
                <p className="text-[13px] text-gray-500 text-nowrap">
                  Your Address:
                </p>
                <div className="w-full">
                  <InputText
                    type="text"
                    value={receiveAddress}
                    readOnly
                    className="p-1 shadow-none border-gray-500 w-full truncate"
                    placeholder="Your crypto address"
                  />
                </div>
              </div>
              <CopyToClipboard text={receiveAddress}>
                <ButtonComponent
                  className="blue-btn rounded-md ms-auto max-w-fit py-2 px-4"
                  onClick={receiveHandler}
                >
                  Copy
                </ButtonComponent>
              </CopyToClipboard>
            </div>
          </Dialog>

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-[14px] text-gray-500">Your Balance</h2>
              <h3 className="text-[24px] font-semibold flex items-center">
                {walletDetailLoading ? (
                  <Skeleton height="34.5px" width="90px" />
                ) : (
                  parseFloat(walletDetailData?.balance || 0).toFixed(1)
                )}
              </h3>
            </div>
            <div className="flex gap-[10px]">
              <Button
                onClick={() => setVisible(true)}
                className="bg-primary shadow-none rounded-full p-3 border-none"
              >
                <i className="pi pi-send"></i>
              </Button>
              <Button
                onClick={() => setReceiveVisible(true)}
                className="bg-primary shadow-none rounded-full p-3 border-none"
              >
                <i className="pi pi-plus"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2">
        <h1 className="text-[14px] text-gray-500">Transactions History</h1>
      </div>
      <div className="px-4 py-2 scrollbar-y-hide overflow-y-scroll flex flex-col flex-grow">
        <TransactionComponent />
      </div>
    </>
  );
};

export default HomeComponent;
