// @ts-ignore
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "../../input/Input.tsx";

type ControlledInputProps = {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
};

const ControlledInput: FC<ControlledInputProps> = ({
  name = "",
  label,
  disabled = false,
  defaultValue = "",
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <Input
          className={"p-inputtext-sm"}
          value={field.value}
          disabled={disabled}
          placeholder={label}
          onChange={(event) => field.onChange(event)}
          id={name}
        />
      )}
    />
  );
};

export default ControlledInput;
