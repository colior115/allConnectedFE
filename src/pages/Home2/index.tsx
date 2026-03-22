import { useTranslation } from "react-i18next";

export default function Home2() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("login")}</h1>
    </div>
  );
}