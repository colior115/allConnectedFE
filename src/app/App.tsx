import { RouterProvider } from "react-router-dom";
import "../i18n/i18n";
import "../styles/global.css";
import { router } from "./router/router";
import { AuthProvider } from "./providers/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}