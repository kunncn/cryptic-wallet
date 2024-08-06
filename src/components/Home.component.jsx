import { Button } from "primereact/button";
import ContainerComponent from "./Container.component";
import Avvvatars from "avvvatars-react";
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

const HomeComponent = () => {
  const toast = useRef(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [visible, setVisible] = useState(false);
  const [receiveVisible, setReceiveVisible] = useState(false);
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const address = useSelector((state) => state.userInfo.address);
  const [receiveAddress, setReceiveAddress] = useState(
    "YourGeneratedCryptoAddress"
  );
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
    try {
      const res = await postTransaction({
        recipient: cryptoAddress,
        amount: Number(amount),
      });
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Transaction Successful",
        life: 1300,
      });
      setVisible(false);
    } catch (error) {
      console.error(error);

      let errorMessage = "An unexpected error occurred";
      let severity = "error";

      toast.current.show({
        severity,
        summary: "Transaction Failed",
        detail: errorMessage,
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
      <ContainerComponent className="px-4 py-2">
        <div>
          <Toast position="top-center" ref={toast} />

          {!isOnline && (
            <div className="flex justify-center items-center p-4 bg-yellow-200 text-yellow-800">
              You are currently offline. Some features may not be available.
            </div>
          )}

          {/* Send Crypto Dialog */}
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
                    placeholder="Enter crypto address"
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
                    placeholder="Enter amount"
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
                  <Skeleton height="34.5px" width="70px" />
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
      </ContainerComponent>
      <ContainerComponent className="px-4 py-2 scrollbar-y-hide overflow-y-scroll flex flex-col bg-red-300">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[14px] text-gray-500">Transactions History</h1>
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[13px] text-black">12/12/2022</h1>
            <div className="flex justify-between items-center gap-[10px] bg-gray-50 rounded-sm p-[10px]">
              <div>
                <Avvvatars value="John Doe" size={32} />
              </div>
              <div className="max-w-max min-w-[100px]">
                <p className="text-[10px] text-gray-500">Recipient</p>
                <p className="text-[10px] text-gray-500 truncate">
                  TQfutVkuRVTLSWDkwF117mKEyUniTnBbgc
                </p>
              </div>
              <div>
                <div>
                  <p className="text-[10px] text-gray-500">Amount</p>
                  <p className="text-[10px] text-gray-500">0.01</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </>
  );
};

export default HomeComponent;
