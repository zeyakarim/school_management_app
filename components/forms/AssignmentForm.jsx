import Image from 'next/image';
import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";
import DatePickerField from "../formsFields/DatePickerField";

const teachers = [
    { "label": "JOHN", "key": "john"},
    { "label": "ARHAM", "key": "arham" },
    { "label": "RAYAN", "key": "rayan"},
    { "label": "POLLARD", "key": "pollard"},
    { "label": "ROBERT", "key": "robert" },
    { "label": "LARA", "key": "lara"},
    { "label": "MICHEAL", "key": "micheal" },
    { "label": "NICK", "key": "nick" }
]

const AssignmentForm = () => {

    return (
        <div>
            <form action="" method="post">
                <div className="flex gap-3 flex-wrap justify-between">
                    <InputField
                        type="text"
                        label="Subject Name"
                        className="w-[48%]"
                        isRequired={true}
                        icon={ <Image src="/subject.png" alt="" width={16} height={16} /> }
                    />
                    <InputField
                        type="text"
                        label="Assignment Name"
                        className="w-[48%]"
                        isRequired={true}
                        icon={ <Image src="/assignment.png" alt="" width={16} height={16} /> }
                    />
                    <InputField
                        type="number"
                        label="Class Name"
                        className="w-[48%]"
                        isRequired={true}
                        icon={ <Image src="/class.png" alt="" width={18} height={18} /> }
                    />
                    <SelectField
                        isRequired={true}
                        selectionMode="single"
                        label="Teacher"
                        className="w-[48%]"
                        datas={teachers}
                        icon={ <Image src="/teacher.png" alt="" width={16} height={16} /> }
                    />
                    <DatePickerField
                        isRequired={true}
                        label='Date'
                        className="w-[48%]"
                    />
                </div>
            </form>
        </div>
    )
}

export default AssignmentForm;