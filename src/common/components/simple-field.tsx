import { HTMLInputTypeAttribute } from "react";

interface Props {
  id: string;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: number | string;
}

function SimpleField({ id, label, type = "text", name, defaultValue }: Props) {
  return (
    <div>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

export default SimpleField;
