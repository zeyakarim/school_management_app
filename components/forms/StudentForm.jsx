import { Phone, Home, Bloodtype, Person, Email, VisibilityOff, Visibility, CloudUpload } from '@mui/icons-material';
import { useState } from 'react';
import InputField from '../formsFields/InputField';
import DatePickerField from '../formsFields/DatePickerField';
import SelectField from '../formsFields/SelectField';

const genders = [
    { "label": "MALE", "key": "male"},
    { "label": "FEMALE", "key": "female" }
]

const StudentForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <form action="" method="post">
            <p className="text-xs text-gray-500 py-2 pl-[5px]">Authentication Information</p>
            <div className="flex gap-2 flex-wrap">
                <InputField
                    type='text'
                    label='Username'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='email'
                    label='Email'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Email style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type={isVisible ? "text" : "password"}
                    label='Password'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ 
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <VisibilityOff style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                            ) : (
                                <Visibility style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                            )}
                        </button>
                    }
                />
            </div>
            <p className="text-xs text-gray-500 py-4 pl-[5px]">Personal Information</p>

            <div className="flex gap-2 flex-wrap justify-between">
                <InputField 
                    type='text'
                    label='First Name'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='text'
                    label='Last Name'
                    className="w-[32%]"
                    isRequired={false}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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
                <InputField 
                    type='text'
                    label='Blood Type'
                    className="w-[32%]"
                    isRequired={false}
                    icon={ <Bloodtype style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0"  /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Birth Date'
                    className="w-[32%]"
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label='Gender'
                    className="w-[32%]"
                    datas={genders}
                />
                <InputField 
                    type='text'
                    label='Parent'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <div className="flex items-center gap-2 w-full md:w-[32%] mt-[20px]">
                    <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <CloudUpload />
                        <span>Upload a Photo</span>
                    </label>
                    <input type='file' className="hidden" id="img" />
                </div>
            </div>
        </form>
    )
}

export default StudentForm;