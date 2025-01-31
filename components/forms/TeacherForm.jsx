import { Phone, Home, Bloodtype, Person, VisibilityOff, Visibility, Email } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import Image from "next/image";
import InputField from '../formsFields/InputField';
import DatePickerField from '../formsFields/DatePickerField';
import SelectField from '../formsFields/SelectField';
import useFetchData from '@/utils/useFetchData';

const genders = [
    { "label": "MALE", "key": "male"},
    { "label": "FEMALE", "key": "female" }
];

const TeacherForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const formatSubjectLabel = useCallback((item) => item?.name, []);
    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);

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
                    isRequired={false}
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
                <SelectField
                    isRequired={true}
                    selectionMode="multiple"
                    label='Subject'
                    className="w-[32%]"
                    datas={subjects}
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
    )
}

export default TeacherForm;