import { ProtectedRouteComponent } from "../components";

const DashboardPage = () => {
  const logic = localStorage.getItem("token");
  return (
    <ProtectedRouteComponent logic={!logic} to="/auth/token/obtain">
      <div>DashboardPage</div>
    </ProtectedRouteComponent>
  );
};

export default DashboardPage;
