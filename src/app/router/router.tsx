import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Home2 from "../../pages/Home2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home2",
    element: <Home2 />
  }
]);