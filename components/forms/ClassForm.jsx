import { Phone, ReduceCapacity } from '@mui/icons-material';
import { Input, Select, SelectItem } from "@nextui-org/react";
import { MailIcon, EyeSlashFilledIcon, EyeFilledIcon, UserIcon } from "@/lib/icons";
import { useState } from 'react';
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

const ClassForm = () => {

    return (
        <div>
            <form action="" method="post">
                <div className="flex gap-2 flex-wrap justify-between">
                    <Input
                        isRequired
                        type="text"
                        label="Class Name"
                        endContent={
                            <Image src="/class.png" alt="" width={18} height={18} />
                        }
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                    />

                    <Input
                        isRequired
                        endContent={
                            <ReduceCapacity style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Capacity"
                        type='number'
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                    />

                    <Select
                        isRequired
                        label="Supervisor"
                        className="w-[32%]"
                        variant="bordered"
                        labelPlacement="outside"
                        endContent={
                            <Image src="/teacher.png" alt="" width={18} height={18} />
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

export default ClassForm;