import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  useWalletDetailQuery,
  useCreateWalletMutation,
} from "../services/endpoints/wallet.endpoint";
import { classNames } from "primereact/utils";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Skeleton } from "primereact/skeleton";
import notWalletFound from "../assets/wallet-not-found.svg";
import { useRef } from "react";
import { Toast } from "primereact/toast";

const formatBalance = (balance) => {
  const numericBalance = parseFloat(balance);
  return isNaN(numericBalance) ? "0.0" : numericBalance.toFixed(1);
};

const WalletComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);
  const toast = useRef(null);

  const {
    error: walletDetailError,
    data: walletDetailData,
    isLoading: walletDetailLoading,
  } = useWalletDetailQuery();

  const [createWallet, { isLoading: createWalletLoading }] =
    useCreateWalletMutation();

  useEffect(() => {
    if (walletDetailData) {
      setInputValue(walletDetailData.address);
    }
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [walletDetailData, copied]);

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

  return (
    <>
      <Toast position="top-center" ref={toast} />
      {walletDetailError && (
        <div className="px-4 py-2 mx-auto max-w-[1350px] h-[84%] scrollbar-y-hide overflow-y-scroll flex flex-col justify-center items-center">
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
      )}
      <div className="px-4 py-2 mx-auto max-w-[1350px] h-[84%] scrollbar-y-hide overflow-y-scroll flex justify-center items-center h-testing">
        <div className="w-full max-w-[300px]">
          <div className="relative w-[80%] mx-auto flex flex-col gap-[5px]">
            <div className="flex justify-between items-center text-[16px]">
              <p className=" me-1 text-gray-500">Address:</p>
              {walletDetailLoading && <Skeleton height="30px" width="100%" />}
              {walletDetailData && (
                <>
                  <input
                    disabled={true}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 w-full font-semibold truncate outline-none bg-blue-100 p-1 rounded-md"
                  />
                  <CopyToClipboard
                    text={inputValue}
                    onCopy={() => setCopied(true)}
                  >
                    <span className="absolute top-[7px] right-[-25px]">
                      <i className="pi pi-copy text-[20px] relative hover:cursor-pointer text-gray-500 hover:text-black duration-100">
                        {copied && (
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0 }}
                              exit={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.1 }}
                            >
                              <Tag
                                value="Copied"
                                className="bg-primary absolute top-[-37px] right-[-17px] scale-75"
                              ></Tag>
                            </motion.div>
                          </AnimatePresence>
                        )}
                      </i>
                    </span>
                  </CopyToClipboard>
                </>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-center  text-gray-500">Balance:</p>
              {walletDetailLoading && <Skeleton height="30px" width="100%" />}
              {walletDetailData && (
                <p className="text-center  font-semibold mx-auto">
                  {formatBalance(walletDetailData.balance)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletComponent;
