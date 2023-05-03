import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/Routing/Routing";
import User from "./Components/Pages/User/User"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <User/>
    <Routing/>
  </BrowserRouter>
);