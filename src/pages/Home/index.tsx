import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthContext";
import { apiRequest } from "../../services/apiClient";
import "./styles.scss";

export default function Home() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [business, setBusiness] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) return;
    apiRequest(`/business/${businessId}`)
      .then((data) => setBusiness(data))
      .catch(() => setError("Failed to load business details"))
      .finally(() => setLoading(false));
  }, [businessId]);

  async function handleLogout() {
    await logout();
    navigate(`/${businessId}/login`);
  }

  return (
    <div>
      <h1 className="title">{t("welcome")}</h1>
      <button onClick={handleLogout}>Logout</button>
      {loading && <p>Loading business details...</p>}
      {error && <p>{error}</p>}
      {business && (
        <pre>{JSON.stringify(business, null, 2)}</pre>
      )}
    </div>
  );
}