import "./assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App.jsx";
import store, { persistor } from "./reduxtoolkit/store.js";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Haritpane_Farmer/">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
