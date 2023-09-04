// @ts-ignore
import React, { FC } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import ControlledInput from "../../components/form/controlled-input/ControlledInput.tsx";
import ControlledForm from "../../components/form/controlled-form/controlled-form.tsx";
import { FormData, registerFormFields, schema } from "./registerSchema.ts";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/apiClient.ts";
import { setAccessToken } from "../../api/tokenHelper.ts";
import { useNavigate } from "react-router-dom";
import { AppState, useAppState } from "../../global-state/zustand.ts";
import { routes } from "../../router/routes.ts";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAppState((state: AppState) => state.setUser);
  const {
    formState: { isValid },
    getValues,
  } = useFormContext();
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return api.auth.postApiV1AuthRegistration({
        username: data.username,
        password: data.password,
      });
    },
    onSuccess: (result) => {
      setUser(result.user);
      setAccessToken(result.accessToken);

      navigate(routes.root);
    },
  });

  return (
    <RegisterFormWrapper>
      <>
        <h3>{t("register.welcome")}</h3>
        <ControlledInput
          name={registerFormFields.username}
          label={t("register.email")}
        />
        <ControlledInput
          type={"password"}
          name={registerFormFields.password}
          label={t("register.password")}
        />
        <Button
          disabled={!isValid}
          loading={mutation.isLoading}
          label={t("register.registerBtn") as string}
          onClick={() => mutation.mutate(getValues() as FormData)}
        />
        <Button
          severity={"secondary"}
          loading={mutation.isLoading}
          label={t("register.loginBtn") as string}
          onClick={() => navigate(routes.login)}
        />
        {mutation.error && <>Wrong credentials</>}
      </>
    </RegisterFormWrapper>
  );
};
const Register: FC = () => {
  return (
    <>
      <ControlledForm
        defaultValues={{
          username: "",
          password: "",
        }}
        schema={schema}
      >
        <RegisterForm />
      </ControlledForm>
    </>
  );
};

export default Register;

const RegisterFormWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-column: 1;
  grid-row-gap: 0.5rem;

  h2 {
    text-align: center;
  }
`;
