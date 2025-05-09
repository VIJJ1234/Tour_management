import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Routing and Auth
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");

// Make sure this ID exists in your public/index.html
if (!rootElement) {
  throw new Error("Root element not found. Please check public/index.html for <div id='root'></div>");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
