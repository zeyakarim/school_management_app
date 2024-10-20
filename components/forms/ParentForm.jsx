import { Phone, Home } from '@mui/icons-material';
import { Input, Select, SelectItem } from "@nextui-org/react";
import { MailIcon, EyeSlashFilledIcon, EyeFilledIcon, UserIcon } from "@/lib/icons";
import { useState } from 'react';


const students = [
    { "label": "JOHN", "key": "john"},
    { "label": "ARHAM", "key": "arham" },
    { "label": "RAYAN", "key": "rayan"},
    { "label": "POLLARD", "key": "pollard"},
    { "label": "ROBERT", "key": "robert" },
    { "label": "LARA", "key": "lara"},
    { "label": "MICHEAL", "key": "micheal" },
    { "label": "NICK", "key": "nick" }
]

const ParentForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div>
            <form action="" method="post">
                <p className="text-xs text-gray-500 py-2 pl-2">Authentication Information</p>
                <div className="flex gap-2 flex-wrap">
                    <Input
                        isRequired
                        autoFocus
                        type="text"
                        label="Username"
                        variant="bordered"
                        className="w-[32%]"
                        endContent={
                            <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        labelPlacement='outside'
                    />
                    <Input
                        isRequired
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        variant="bordered"
                        type='email'
                        className="w-[32%]"
                        labelPlacement='outside'
                    />
                    <Input
                        isRequired
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        label="Password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement='outside'
                    />
                </div>
                <p className="text-xs text-gray-500 py-2 pl-2">Personal Information</p>

                <div className="flex gap-2 flex-wrap justify-between">
                    <Input
                        isRequired
                        type="text"
                        label="First Name"
                        endContent={
                            <UserIcon className="text-xs text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                    />
                    <Input
                        label="Last Name"
                        endContent={
                            <UserIcon className="text-xs text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        type='text'
                        className="w-[32%]"
                        labelPlacement="outside"
                    />
                    <Input
                        isRequired
                        endContent={
                            <Phone style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Phone"
                        type='number'
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                    />
                    <Input
                        isRequired
                        label="Address"
                        type="text"
                        endContent={
                            <Home style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                    />
                   
                    <Select
                        isRequired
                        selectionMode="multiple"
                        label="Students"
                        className="w-[66%]"
                        variant="bordered"
                        labelPlacement="outside" 
                    >
                        {students.map((student) => (
                            <SelectItem key={student.key}>
                                {student.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </form>
        </div>
    )
}

export default ParentForm;