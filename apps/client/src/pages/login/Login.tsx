// @ts-ignore
import React, { FC } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import ControlledInput from "../../components/form/controlled-input/ControlledInput.tsx";
import ControlledForm from "../../components/form/controlled-form/controlled-form.tsx";
import { FormData, loginFormFields, schema } from "./loginSchema.ts";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/apiClient.ts";
import { setAccessToken } from "../../api/tokenHelper.ts";
import { useNavigate } from "react-router-dom";
import { AppState, useAppState } from "../../global-state/zustand.ts";
import { routes } from "../../router/routes.ts";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAppState((state: AppState) => state.setUser);
  const {
    formState: { isValid },
    getValues,
  } = useFormContext();
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return api.auth.postApiV1AuthLogin({
        username: data.username,
        password: data.password,
      });
    },
    onSuccess: (result) => {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      setAccessToken(result.accessToken);

      navigate(routes.root);
    },
  });

  return (
    <LoginFormWrapper>
      <>
        <h3>{t("login.welcome")}</h3>
        <ControlledInput
          name={loginFormFields.username}
          label={t("login.email")}
        />
        <ControlledInput
          name={loginFormFields.password}
          type={'password'}
          label={t("login.password")}
        />
        <Button
          disabled={!isValid}
          loading={mutation.isLoading}
          label={t("login.loginBtn") as string}
          onClick={() => mutation.mutate(getValues() as FormData)}
        />
        <Button
          severity={"secondary"}
          loading={mutation.isLoading}
          label={t("register.registerBtn") as string}
          onClick={() => navigate(routes.register)}
        />
        {mutation.error && <>Wrong credentials</>}
      </>
    </LoginFormWrapper>
  );
};
const Login: FC = () => {
  return (
    <>
      <ControlledForm
        defaultValues={{
          username: "",
          password: "",
        }}
        schema={schema}
      >
        <LoginForm />
      </ControlledForm>
    </>
  );
};

export default Login;

const LoginFormWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-column: 1;
  grid-row-gap: 0.5rem;
  h3 {
    text-align: center;
  }
`;
