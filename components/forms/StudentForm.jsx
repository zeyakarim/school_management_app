import { Phone, Home, Bloodtype } from '@mui/icons-material';
import { Input, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { MailIcon, EyeSlashFilledIcon, EyeFilledIcon, UserIcon } from "@/lib/icons";
import { useState } from 'react';
import Image from "next/image";

const genders = [
    { "label": "MALE", "key": "male"},
    { "label": "FEMALE", "key": "female" }
]

const StudentForm = () => {
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
                    <Input
                        label="Blood Type"
                        variant="bordered"
                        type='text'
                        endContent={
                            <Bloodtype style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0"  />
                        }
                        className="w-[32%]"
                        labelPlacement="outside"
                    />

                    <DatePicker label="Birth date" className="w-[32%]"  variant="bordered" labelPlacement="outside" />

                    <Select
                        isRequired
                        label="Gender"
                        className="w-[32%]"
                        variant="bordered"
                        labelPlacement="outside"
                    >
                        {genders.map((gender) => (
                            <SelectItem key={gender.key}>
                                {gender.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Input
                        isRequired
                        type="text"
                        label="Parent"
                        endContent={
                            <UserIcon className="text-xs text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        className="w-[32%]"
                        labelPlacement="outside"
                    />

                    <div className="flex items-center gap-2 w-full md:w-[32%]">
                        <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                            <Image src="/upload.png" alt='' width={24} height={24} />
                            <span>Upload a Photo</span>
                        </label>
                        <input type='file' className="hidden" id="img" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StudentForm;