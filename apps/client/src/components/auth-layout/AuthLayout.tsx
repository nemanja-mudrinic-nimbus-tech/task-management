import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const AuthLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AuthPageContainer>
      <div className={"form-wrapper"}>{children}</div>
    </AuthPageContainer>
  );
};

const AuthPageContainer = styled.div`
  height: 100%;
  display: grid;

  .form-wrapper {
    justify-self: center;
    align-self: center;
  }
`;

export default AuthLayout;
