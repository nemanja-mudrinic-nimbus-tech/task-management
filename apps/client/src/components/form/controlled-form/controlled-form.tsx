import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodType } from "zod";

interface Props {
  children: React.ReactNode;
  schema: unknown;
  defaultValues?: unknown;
}

const ControlledForm: FC<Props> = ({
  children,
  schema,
  defaultValues,
  ...rest
}) => {
  const methods = useForm({
    defaultValues: {
      ...(defaultValues ? defaultValues : {}),
    },
    mode: "onChange",
    resolver: zodResolver(schema as ZodType),
  });

  return (
    <FormProvider {...methods} {...rest}>
      {children}
    </FormProvider>
  );
};

export default ControlledForm;
