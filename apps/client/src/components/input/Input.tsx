import React, { FC } from "react";
import { InputText, InputTextProps } from "primereact/inputtext";

const Input: FC<InputTextProps & React.RefAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <InputText {...props} />;
};

export default Input;
