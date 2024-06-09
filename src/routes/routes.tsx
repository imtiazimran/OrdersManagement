import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
      },
      {
        path: "/sale-orders",
        element: <div>This is Sale Orders</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <div>This is Login</div>,
  },
  {
    path: "/register",
    element: <div>This is Register</div>,
  },
]);
