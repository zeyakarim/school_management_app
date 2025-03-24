import { Input } from "@nextui-org/react";

const InputField = ({ type, label, name, icon, isRequired, className, value, onChange, placeholder }) => {
    const handleChange = (e) => {
        let newValue = e?.target?.value;

        if (
            type === "number" && 
            !["capacity", "percentage", "mark", "total"].includes(name) // More readable condition
        ) {
            // Remove non-numeric characters
            newValue = newValue.replace(/\D/g, "");
        
            // Limit phone numbers to 10 digits
            if (name === "phone") {
                newValue = newValue.slice(0, 10);
            }
        
            // Convert to a number and pass to onChange
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
            placeholder={placeholder || ''}
        />
    );
};

export default InputField;