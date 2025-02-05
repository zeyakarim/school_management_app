const { TimeInput } = require("@nextui-org/react")

const TimeInputField = ({ isRequired, label, name, defaultValue, icon, className }) => {
    return (
        <TimeInput
            isRequired={isRequired}
            label={label}
            name={name}
            labelPlacement="outside" 
            defaultValue={defaultValue} 
            variant="bordered"
            className={className}
            startContent={(icon)}
        />
    )
};

export default TimeInputField;