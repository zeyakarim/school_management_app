import { Input } from "@nextui-org/react";

const InputField = ({type, label, icon, isRequired, className }) => {
    return (
        <Input
            isRequired={isRequired}
            type={type}
            label={label}
            endContent={icon}
            variant="bordered"
            className={className}
            labelPlacement="outside"
            autoComplete="off"
        />
    )
}

export default InputField;