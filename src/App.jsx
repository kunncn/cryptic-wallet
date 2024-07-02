import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/token/obtain" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
