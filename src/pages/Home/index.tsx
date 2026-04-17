import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext";
import "./styles.scss";

export default function Home() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div>
      <h1 className="title">{t("welcome")}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}