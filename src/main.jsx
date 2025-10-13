import "./assets/css/style.css";
import App from "./App.jsx";
import store from "./reduxtoolkit/store.js";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Haritpane_Farmer/">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
