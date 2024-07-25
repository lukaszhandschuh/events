import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as AppStore } from "react-redux";
import "./index.css";
import AppLocale from "./providers/AppLocale.tsx";
import AppRouter from "./providers/AppRouter.tsx";
import store from "./redux/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStore store={store}>
      <AppLocale>
        <AppRouter />
      </AppLocale>
    </AppStore>
  </React.StrictMode>
);
