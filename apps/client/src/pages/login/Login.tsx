import { FC } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const Login: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>Login</h1>
      <Button label={t("login.welcome") as string} />
    </>
  );
};

export default Login;
