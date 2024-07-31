import { NavBarComponent, ProtectedRouteComponent } from "../components";
import { HeroSection } from "../sections";
import FeaturesSection from "../sections/Features.section";

const HomePage = () => {
  return (
    <>
      <ProtectedRouteComponent
        logic={localStorage.getItem("login")}
        to={"/dashboard"}
      >
        <NavBarComponent />
        <HeroSection />
        <FeaturesSection />
      </ProtectedRouteComponent>
    </>
  );
};

export default HomePage;
