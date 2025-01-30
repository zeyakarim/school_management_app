import { Phone, Home } from '@mui/icons-material';
import { MailIcon, EyeSlashFilledIcon, EyeFilledIcon, UserIcon } from "@/lib/icons";
import { useState } from 'react';
import InputField from '../formsFields/InputField';
import SelectField from '../formsFields/SelectField';


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
                    <InputField
                        type='text'
                        label='Username'
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <InputField 
                        type='email'
                        label='Email'
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <InputField 
                        type={isVisible ? "text" : "password"}
                        label='Password'
                        className="w-[32%]"
                        isRequired={true}
                        icon={ 
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />
                </div>
                <p className="text-xs text-gray-500 py-2 pl-2">Personal Information</p>

                <div className="flex gap-2 flex-wrap justify-between">
                    <InputField 
                        type='text'
                        label='First Name'
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <UserIcon className="text-xs text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <InputField 
                        type='text'
                        label='Last Name'
                        className="w-[32%]"
                        isRequired={false}
                        icon={ <UserIcon className="text-xs text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <InputField 
                        type='number'
                        label='Phone'
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <Phone style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <InputField 
                        type='text'
                        label='Address'
                        className="w-[32%]"
                        isRequired={true}
                        icon={ <Home style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <SelectField
                        isRequired={true}
                        selectionMode="multiple"
                        label="Students"
                        className="w-[66%]"
                        datas={students}
                    />
                </div>
            </form>
        </div>
    )
}

export default ParentForm;