import { Avatar, Select, SelectItem } from "@nextui-org/react";

const SelectField = ({ isRequired, label, name, className, datas, selectionMode, icon }) => {
    return (
        <Select
            isRequired={isRequired}
            selectionMode={selectionMode}
            label={label}
            name={name}
            className={className}
            classNames={{ trigger: "shadow-none" }}
            variant="bordered"
            labelPlacement="outside"
            endContent={icon ? icon : null}
        >
            {datas?.length > 0 && datas?.map((data) => (
                <SelectItem 
                    key={data?.key}
                    startContent={data?.icon ? <Avatar alt="" className="w-6 h-6" src={data?.icon} /> : null}
                >
                    {data.label}
                </SelectItem>
            ))}
        </Select>
    )
}

export default SelectField;