import { Input, Select, SelectItem } from "@nextui-org/react";
import Image from 'next/image';

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
                    <Input
                        isRequired
                        type="subject"
                        label="Subject"
                        endContent={
                            <Image src="/subject.png" alt="" width={16} height={16} />
                        }
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                        autoComplete="off"
                    />

                    <Select
                        selectionMode="multiple"
                        label="Teacher"
                        className="w-[66%]"
                        variant="bordered"
                        labelPlacement="outside"
                        endContent={
                            <Image src="/teacher.png" alt="" width={16} height={16} />
                        } 
                    >
                        {teachers.map((teacher) => (
                            <SelectItem key={teacher.key}>
                                {teacher.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </form>
        </div>
    )
}

export default SubjectForm;