import { LockIcon, MailIcon, EyeSlashFilledIcon, EyeFilledIcon, UserIcon } from "@/lib/icons";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    Button, Checkbox, Input, DatePicker, Select, SelectItem 
} from "@nextui-org/react";
import { useState } from "react";
import { Phone, Home, Bloodtype } from '@mui/icons-material';
import Image from "next/image";

const genders = [
    { "label": "MALE", "key": "male"},
    { "label": "FEMALE", "key": "female" }
]

export default function Dialog({ isOpen, onOpenChange, dialogTitle}) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    return (
        <>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            size="2xl"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{dialogTitle && dialogTitle}</ModalHeader>
                <ModalBody>
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
                        />
                        <Input
                            label="Last Name"
                            endContent={
                                <UserIcon className="text-xs text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            variant="bordered"
                            type='text'
                            className="w-[32%]"
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
                        />
                        <Input
                            label="Address"
                            type="text"
                            endContent={
                                <Home style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            variant="bordered"
                            className="w-[32%]"
                        />
                        <Input
                            label="Blood Type"
                            variant="bordered"
                            type='text'
                            endContent={
                                <Bloodtype style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0"  />
                            }
                            className="w-[32%]"
                        />

                        <DatePicker label="Birth date" className="w-[32%]"  variant="bordered" />

                        <Select
                            label="Gender"
                            className="w-[32%]"
                            variant="bordered"
                        >
                            {genders.map((gender) => (
                                <SelectItem key={gender.key}>
                                    {gender.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <div className="flex flex-col gap-2 w-full md:w-[32%]">
                            <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer mt-[14px]" htmlFor="img">
                                <Image src="/upload.png" alt='' width={24} height={24} />
                                <span>Upload a Photo</span>
                            </label>
                            <input type='file' className="hidden" id="img" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="mt-2">
                    <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                        Close
                    </Button>
                    <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                        Create
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
}