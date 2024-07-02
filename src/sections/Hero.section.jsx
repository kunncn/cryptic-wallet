import {
  ContainerComponent,
  FormComponent,
  PageTransitionComponent,
} from "../components";
import img from "../assets/wallet1.webp";

const HeroSection = () => {
  return (
    <PageTransitionComponent>
      <ContainerComponent>
        <div className="flex flex-col hero-desktop:flex-row items-center justify-between hero-desktop:py-6 px-10 hero-desktop:px-[70px] gap-10 hero-desktop:gap-0 hero-mobile:p-6">
          <div className="order-2 hero-desktop:order-none">
            <img
              src={img}
              alt="wallet image"
              className=" w-[350px] hero-desktop:w-auto hero-desktop:h-auto "
            />
          </div>
          <div className="hero-mobile:max-w-[500px] hero-tablet:max-w-[900px] hero-desktop:max-w-[500px] hero-desktop:ml-4 flex flex-col hero-mobile:gap-[10px] hero-desktop:gap-[20px] hero-mobile:items-center hero-desktop:items-start">
            <h1 className=" hero-mobile:text-[29px]  hero-desktop:text-[49px] hero-h1 font-poppins hero-mobile:text-center hero-desktop:text-left hero-mobile:leading-[40px] hero-desktop:leading-[60px]">
              Your Trusted TRC-20{" "}
              <span className="text-primary font-mono font-bold">Cryptic</span>{" "}
              <span className="font-mono font-bold">Wallet</span>
            </h1>
            <h2 className="font-poppins hero-mobile:text-[18px] hero-desktop:text-[22px] text-center hero-desktop:text-left">
              Secure, Simple, and Smart
            </h2>
            <p className="font-poppins hero-mobile:text-[14px] hero-desktop:text-[19px] text-center hero-desktop:text-left hero-mobile:max-w-[340px] hero-tablet:max-w-[400px] hero-desktop:max-w-[500px]">
              Manage your TRC-20 tokens effortlessly with our user-friendly app.
              Create transactions, track your history, and keep your tokens safe
              in a secure wallet. Join us and experience the future of digital
              finance.
            </p>
            <div className="mt-4">
              <FormComponent />
            </div>
          </div>
        </div>
      </ContainerComponent>
    </PageTransitionComponent>
  );
};

export default HeroSection;
