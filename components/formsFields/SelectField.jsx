import { Avatar, Select, SelectItem } from "@nextui-org/react";

const SelectField = ({ isRequired, label, name, className, datas, selectionMode, icon, value, onChange }) => {
    return (
        <Select
            isRequired={isRequired}
            selectionMode={selectionMode}
            label={label}
            name={name}
            value={value}
            selectedKeys={[value]}
            onChange={(e) => onChange(name, e?.target?.value)}  // Pass both name and date
            className={className}
            classNames={{ trigger: "shadow-none" }}
            variant="bordered"
            labelPlacement="outside"
            endContent={icon ? icon : null}
        >
            {datas?.length > 0 && datas?.map((data) => (
                <SelectItem 
                    key={data?.key || data?.id}
                    value={data?.id}
                    startContent={data?.icon ? <Avatar alt="" className="w-6 h-6" src={data?.icon} /> : null}
                >
                    {data.label}
                </SelectItem>
            ))}
        </Select>
    )
}

export default SelectField;