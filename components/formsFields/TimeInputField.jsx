const { TimeInput } = require("@nextui-org/react")

const TimeInputField = ({ isRequired, label, defaultValue, icon, className }) => {
    return (
        <TimeInput
            isRequired={isRequired}
            label={label} 
            labelPlacement="outside" 
            defaultValue={defaultValue} 
            variant="bordered"
            className={className}
            startContent={(icon)}
        />
    )
};

export default TimeInputField;