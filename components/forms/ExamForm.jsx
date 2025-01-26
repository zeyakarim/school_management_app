import { AccessTime } from '@mui/icons-material';
import { DatePicker, Input, Select, SelectItem, TimeInput } from "@nextui-org/react";
import Image from 'next/image';
import {Time} from "@internationalized/date";

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

const ExamForm = () => {

    return (
        <div>
            <form action="" method="post">
                <div className="flex gap-3 flex-wrap justify-between">
                    <Input
                        isRequired
                        type="text"
                        label="Subject Name"
                        endContent={
                            <Image src="/subject.png" alt="" width={16} height={16} />
                        }
                        variant="bordered"
                        className="w-[32%] mt-1"
                        labelPlacement="outside"
                        autoComplete="off"
                    />
                    <Input
                        isRequired
                        label="Class Name"
                        endContent={
                            <Image src="/class.png" alt="" width={18} height={18} />
                        }
                        variant="bordered"
                        type='text'
                        className="w-[32%] mt-1"
                        labelPlacement="outside"
                        autoComplete="off"
                    />
                    <Select
                        isRequired
                        label="Teacher"
                        className="w-[32%] mt-1"
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

                    <DatePicker label="Date" className="w-[32%] mt-1"  variant="bordered" labelPlacement="outside" isRequired />

                    <TimeInput
                        isRequired
                        label="Start Time" 
                        labelPlacement="outside" 
                        defaultValue={new Time(9, 0)} 
                        variant="bordered"
                        className="w-[32%] mt-1"
                        startContent={(
                            <AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                        )}
                    />

                    <TimeInput
                        isRequired
                        label="End Time" 
                        labelPlacement="outside" 
                        defaultValue={new Time(12)} 
                        variant="bordered"
                        className="w-[32%] mt-1"
                        startContent={(
                            <AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                        )}
                    />
                </div>
            </form>
        </div>
    )
}

export default ExamForm;