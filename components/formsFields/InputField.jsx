import { Input } from "@nextui-org/react";

const InputField = ({ type, label, name, icon, isRequired, className, value, onChange, min, max, step }) => {
    const handleChange = (e) => {
        let newValue = e?.target?.value;

        if (type === "number") {
            newValue = newValue.replace(/\D/g, ""); 

            if (name === "phone") {
                newValue = newValue.slice(0, 10);
            }

            let numericValue = Number(newValue);
            onChange(name, numericValue);
        } else {
            onChange(name, newValue);
        }
    };

    const handleBlur = () => {
        if (name === "phone" && value.toString().length !== 10) {
            alert("Phone number must be exactly 10 digits.");
        }
    };

    return (
        <Input
            required={isRequired}
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            endContent={icon}
            variant="bordered"
            className={className}
            labelPlacement="outside"
            autoComplete="off"
        />
    );
};

export default InputField;