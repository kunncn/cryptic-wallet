import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouteComponent = ({ logic, to, children }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (logic) {
      nav(to);
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRouteComponent;
