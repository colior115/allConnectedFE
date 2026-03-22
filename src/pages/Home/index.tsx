import { useTranslation } from "react-i18next";
import "./styles.scss";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="title">{t("welcome")}</h1>
    </div>
  );
}