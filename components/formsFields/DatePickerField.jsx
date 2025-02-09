import { DatePicker } from "@nextui-org/react";

const DatePickerField = ({ isRequired, label, className, name, value, onChange }) => {
    return (
        <DatePicker
            isRequired={isRequired}
            label={label}
            name={name}
            className={className}
            value={value}
            onChange={(date) => onChange(name, date)}
            variant="bordered"
            labelPlacement="outside"
            classNames={{
                base: "shadow-none overflow-hidden", // Remove shadow from the entire component
                inputWrapper: "shadow-none overflow-hidden", // Remove shadow from the input
                popoverContent: "shadow-none overflow-hidden", // Remove shadow from the dropdown
            }}

        />
    );
};

export default DatePickerField;
