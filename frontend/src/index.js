import React from "react";
import ReactDOM from "react-dom/client";
import "react-notifications/lib/notifications.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { NotificationContainer } from "react-notifications";

import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
    <NotificationContainer />
  </UserProvider>
);
