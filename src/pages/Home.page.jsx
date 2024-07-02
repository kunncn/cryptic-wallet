import { NavBarComponent } from "../components";
import { HeroSection } from "../sections";
import FeaturesSection from "../sections/Features.section";

const HomePage = () => {
  return (
    <>
      <NavBarComponent />
      <HeroSection />
      <FeaturesSection />
    </>
  );
};

export default HomePage;
