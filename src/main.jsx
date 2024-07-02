import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </Router>
);
