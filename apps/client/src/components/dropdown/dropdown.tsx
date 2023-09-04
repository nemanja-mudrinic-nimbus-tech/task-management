import { FC } from "react";
import { Dropdown } from "primereact/dropdown";

type DropdownProps = {
  items: { label: string; value: string }[];
  value: string;
  onSelect: (e: any) => void;
  className?: string;
  placeholder: string;
  disabled?: boolean;
};

const DropdownComponent: FC<DropdownProps> = ({
  items,
  value,
  onSelect,
  className,
  placeholder,
  disabled,
}) => {
  return (
    <Dropdown
      value={value}
      onChange={(e: any) => onSelect(e.value)}
      options={items}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      showClear={true}
    />
  );
};

export default DropdownComponent;
