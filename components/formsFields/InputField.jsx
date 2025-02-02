import { Input } from "@nextui-org/react";

const InputField = ({type, label, name, icon, isRequired, className }) => {
    return (
        <Input
            required={isRequired}
            isRequired={isRequired}
            type={type}
            label={label}
            name={name}
            endContent={icon}
            variant="bordered"
            className={className}
            labelPlacement="outside"
            autoComplete="off"
        />
    )
}

export default InputField;