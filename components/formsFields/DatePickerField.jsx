import { DatePicker } from "@nextui-org/react";

const DatePickerField = ({ isRequired, label, className, name }) => {
    return (
        <DatePicker
            isRequired={isRequired}
            label={label}
            name={name}
            className={className}
            variant="bordered"
            labelPlacement="outside"
            classNames={{
                base: "shadow-none", // Remove shadow from the entire component
                inputWrapper: "shadow-none", // Remove shadow from the input
                popoverContent: "shadow-none", // Remove shadow from the dropdown
            }}
        />
    )
};

export default DatePickerField;