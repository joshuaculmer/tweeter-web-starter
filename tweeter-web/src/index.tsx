import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import UserInfoProvider from "./model.presenter/UserInfoProvider";
import ToastInfoProvider from "./model.presenter/ToastInfoProvider";

library.add(fab);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <UserInfoProvider>
    <ToastInfoProvider>
      <App />
    </ToastInfoProvider>
  </UserInfoProvider>
);
