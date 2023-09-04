import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DropdownComponent from "../../dropdown/dropdown.tsx";

interface Props {
  name: string;
  items: any;
  className?: string;
  placeholder: string;
  disabled?: boolean;
}

const ControlledDropdown: FC<Props> = ({
  name,
  items,
  className,
  placeholder,
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => (
        <DropdownComponent
          items={items}
          value={value}
          onSelect={(e) => onChange(e)}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    />
  );
};

export default ControlledDropdown;
