import { Input } from "@nextui-org/react";

const InputField = ({type, label, name, icon, isRequired, className, value, onChange }) => {
    return (
        <Input
            required={isRequired}
            isRequired={isRequired}
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e?.target?.value)}  // Pass both name and date
            endContent={icon}
            variant="bordered"
            className={className}
            labelPlacement="outside"
            autoComplete="off"
        />
    )
}

export default InputField;