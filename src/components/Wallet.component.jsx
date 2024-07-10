import React from "react";
import { Button } from "primereact/button";
import {
  useWalletDetailQuery,
  useCreateWalletMutation,
} from "../services/endpoints/wallet.endpoint";
import { classNames } from "primereact/utils";
import { FadeLoader } from "react-spinners";

const WalletComponent = () => {
  const {
    error: walletDetailError,
    data: walletDetailData,
    isLoading: walletDetailLoading,
  } = useWalletDetailQuery();

  const [createWallet, { isLoading: createWalletLoading }] =
    useCreateWalletMutation();

  const handleCreateWallet = async () => {
    await createWallet();
  };

  console.log(walletDetailData);

  return (
    <div className="px-4 py-2 mx-auto max-w-[1350px] h-[84%] overflow-y-scroll flex flex-col justify-center items-center">
      {walletDetailError && (
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <h1 className="font-poppins text-[20px] text-black">
            No Wallet Found
          </h1>
          <Button
            className={classNames(
              "bg-primary scale-90 shadow-none outline-none flex justify-center w-fit px-[15px]"
            )}
            onClick={handleCreateWallet}
            disabled={createWalletLoading}
          >
            {createWalletLoading ? "Creating Wallet..." : "Create Wallet"}
          </Button>
        </div>
      )}
      {walletDetailLoading && (
        <FadeLoader color="#014CEC" loading={walletDetailLoading} size={20} />
      )}
      {walletDetailData && (
        <div className="bg-lime-500 max-w-[200px]">
          <div className="flex justify-between text-[16px]">
            <p>Address </p>
            <p className="truncate">
              {" : "} {walletDetailData.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
