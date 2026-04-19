import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import BusinessNotFound from "../../pages/BusinessNotFound";
import BusinessLayout from "./BusinessLayout";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BusinessNotFound />
  },
  {
    path: "/:businessId/login",
    element: <Login />
  },
  {
    path: "/:businessId/register",
    element: <Register />
  },
  {
    path: "/:businessId",
    element: <BusinessLayout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Home /></ProtectedRoute>
      }
    ]
  },
  {
    path: "*",
    element: <BusinessNotFound />
  }
]);