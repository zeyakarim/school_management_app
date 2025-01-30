import Image from 'next/image';
import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";

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

const SubjectForm = () => {

    return (
        <div>
            <form action="" method="post">
                <div className="flex gap-2 flex-wrap justify-between">
                    <InputField
                        type="text"
                        label="Subject"
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <Image src="/subject.png" alt="" width={16} height={16} /> }
                    />
                    <SelectField
                        isRequired={true}
                        selectionMode="multiple"
                        label="Teacher"
                        className="w-[66%]"
                        datas={teachers}
                        icon={ <Image src="/teacher.png" alt="" width={16} height={16} /> }
                    />
                </div>
            </form>
        </div>
    )
}

export default SubjectForm;