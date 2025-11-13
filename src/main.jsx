// import {StrictMode} from "react"
import {createRoot} from "react-dom/client";
import "./styles/style.css";
import App from "./App.jsx";
import {Provider as ReduxProvider} from "react-redux";
import store from "./app/store.js";

createRoot(document.querySelector(".main")).render(
  // <StrictMode></StrictMode>
  <ReduxProvider store={store}>
      <App />
  </ReduxProvider>
);
