import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import "./main.css";

const rootElement = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />
  }
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
