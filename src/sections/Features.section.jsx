import { ContainerComponent, PageTransitionComponent } from "../components";
import wallet1 from "../assets/wallet2.png";
import transaction from "../assets/transaction.webp";

const FeaturesSection = () => {
  return (
    <PageTransitionComponent>
      <ContainerComponent className="hero-desktop:mt-[70px]">
        <div className="p-6">
          <h1
            id="features"
            className="font-poppins font-bold text-center text-[32px] mb-6"
          >
            Features
          </h1>
          <div>
            <div className="grid grid-cols-1 hero-desktop:grid-cols-2 gap-4">
              <div className="flex justify-center hero-desktop:order-2">
                <img src={wallet1} className="w-[500px]" alt="wallet image" />
              </div>
              <div className="grid place-content-center gap-8">
                <div className="flex flex-col gap-4">
                  <h1 className="font-poppins font-bold hero-mobile:text-[20px]  hero-desktop:text-[24px]">
                    Create a New TRC-20 Wallet
                  </h1>
                  <p className="font-poppins hero-mobile:text-[14px] hero-desktop:text-[16px]  max-w-[500px]">
                    Set up a secure wallet for your TRC-20 tokens in just a few
                    clicks. Our app makes it simple to create and manage your
                    wallet, ensuring your tokens are always safe.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-poppins font-bold hero-mobile:text-[20px]  hero-desktop:text-[24px]">
                    View Wallet Details
                  </h1>
                  <p className="font-poppins hero-mobile:text-[14px] hero-desktop:text-[16px]  max-w-[500px]">
                    Access detailed information about your TRC-20 wallet,
                    including your balance and transaction history. Stay
                    informed about your assets with our easy-to-use interface.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 hero-desktop:grid-cols-2 gap-4 mt-[40px] hero-desktop:mt-[90px]">
              <div className="flex justify-center">
                <img
                  src={transaction}
                  className="w-[500px] scale-x-[-1]"
                  alt="transaction image"
                />
              </div>
              <div className="grid place-content-center gap-8">
                <div className="flex flex-col gap-4">
                  <h1 className="font-poppins font-bold hero-mobile:text-[20px]  hero-desktop:text-[24px]">
                    Create TRC-20 Transactions
                  </h1>
                  <p className="font-poppins hero-mobile:text-[14px] hero-desktop:text-[16px]  max-w-[500px]">
                    Easily create new TRC-20 token transactions. Just provide
                    the necessary details, and our app will handle the rest,
                    ensuring your tokens are sent securely and quickly.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-poppins font-bold hero-mobile:text-[20px]  hero-desktop:text-[24px]">
                    View Transaction History
                  </h1>
                  <p className="font-poppins hero-mobile:text-[14px] hero-desktop:text-[16px]  max-w-[500px]">
                    Keep track of all your TRC-20 token transactions in one
                    place. Our app allows you to view your entire transaction
                    history, making it easy to monitor your token movements.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-poppins font-bold hero-mobile:text-[20px]  hero-desktop:text-[24px]">
                    Detailed Transaction Information
                  </h1>
                  <p className="font-poppins hero-mobile:text-[14px] hero-desktop:text-[16px]  max-w-[500px]">
                    Need details about a specific transaction? Simply enter the
                    transaction hash to get comprehensive information about any
                    TRC-20 transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </PageTransitionComponent>
  );
};

export default FeaturesSection;
