import { RouterProvider } from "react-router-dom";
import "../i18n/i18n";
import "../styles/global.css";
import { router } from "./router/router";

export default function App() {
  return <RouterProvider router={router} />;
}