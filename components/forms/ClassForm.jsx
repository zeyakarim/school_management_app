import { Phone, ReduceCapacity } from '@mui/icons-material';
import { Input, Select, SelectItem } from "@nextui-org/react";
import { MailIcon, EyeSlashFilledIcon, EyeFilledIcon, UserIcon } from "@/lib/icons";
import { useState } from 'react';
import Image from 'next/image';
import InputField from '../formsFields/InputField';
import SelectField from '../formsFields/SelectField';


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
                    <InputField
                        type="text"
                        label="Class Name"
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <Image src="/class.png" alt="" width={18} height={18} /> }
                    />
                    <InputField
                        type="number"
                        label="Capacity"
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <ReduceCapacity style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <SelectField
                        isRequired={true}
                        selectionMode="single"
                        label="Supervisor"
                        className="w-[32%]"
                        datas={teachers}
                        icon={ <Image src="/teacher.png" alt="" width={18} height={18} /> }
                    />
                </div>
            </form>
        </div>
    )
}

export default ClassForm;