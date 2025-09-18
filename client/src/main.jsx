import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Content from "./components/Content";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "content",
        element: <Content />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>
);
