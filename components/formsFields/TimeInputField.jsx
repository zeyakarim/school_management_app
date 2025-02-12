const { TimeInput } = require("@nextui-org/react")

const TimeInputField = ({ isRequired, label, name, icon, className, onChange, value }) => {
    return (
        <TimeInput
            isRequired={isRequired}
            label={label}
            name={name}
            labelPlacement="outside" 
            value={value}
            onChange={(time) => onChange(name, time)}
            variant="bordered"
            className={className}
            startContent={(icon)}
        />
    )
};

export default TimeInputField;