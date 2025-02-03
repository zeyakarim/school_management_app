import { Phone, Home, Bloodtype, Person, Email, VisibilityOff, Visibility, CloudUpload, AirlineSeatReclineNormal } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import InputField from '../formsFields/InputField';
import DatePickerField from '../formsFields/DatePickerField';
import SelectField from '../formsFields/SelectField';
import { Button } from '@nextui-org/react';
import useFetchData from '@/utils/useFetchData';

const genders = [
    { "label": "MALE", "key": "MALE"},
    { "label": "FEMALE", "key": "FEMALE" }
]

const StudentForm = ({ type, data, relatedData, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const formatSubjectLabel = useCallback((item) => item?.name, []);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted"); // Replace with actual logic
        const file = event?.target?.file?.files[0];
        const birthDate = event?.target?.birthDate?.value;
        const formattedBirthDate = birthDate ? new Date(birthDate).toISOString() : null;

        const formData = new FormData()
        formData.append("file", file);
        formData.append("username", event?.target?.username?.value || '');
        formData.append("email", event?.target?.email?.value || '');
        formData.append("password", event?.target?.password?.value || '');
        formData.append("first_name", event?.target?.firstName?.value || '');
        formData.append("last_name", event?.target?.lastName?.value || '');
        formData.append("phone", event?.target?.phone?.value || '');
        formData.append("address", event?.target?.address?.value || '');
        formData.append("blood_type", event?.target?.bloodType?.value || '');
        formData.append("birth_date", formattedBirthDate);
        formData.append("gender", event?.target?.gender?.value || '');
        formData.append("parent", event?.target?.parent?.value || '');
        formData.append("class", event?.target?.class?.value || '');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/students`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Student created successfully!");
                onClose();
            } else {
                console.error("Failed to create student.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form method="post" onSubmit={handleSubmit}>
            <p className="text-xs text-gray-500 py-2 pl-[5px]">Authentication Information</p>
            <div className="flex gap-2 flex-wrap">
                <InputField
                    type='text'
                    label='Username'
                    name='username'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='email'
                    label='Email'
                    name='email'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Email style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type={isVisible ? "text" : "password"}
                    label='Password'
                    name='password'
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
                    name='firstName'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='text'
                    label='Last Name'
                    name='lastName'
                    className="w-[32%]"
                    isRequired={false}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='number'
                    label='Phone'
                    name='phone'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Phone style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='text'
                    label='Address'
                    name='address'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Home style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='text'
                    label='Blood Type'
                    name='bloodType'
                    className="w-[32%]"
                    isRequired={false}
                    icon={ <Bloodtype style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0"  /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Birth Date'
                    name='birthDate'
                    className="w-[32%]"
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label='Gender'
                    name='gender'
                    className="w-[32%]"
                    datas={genders}
                />
                <InputField 
                    type='text'
                    label='Parent'
                    name='parent'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='file'
                    label='Upload a Photo'
                    name='file'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                 <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[32%] mt-1"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                {/* <div className="flex items-center gap-2 w-full md:w-[32%] mt-[20px]">
                    {/* <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <CloudUpload />
                        <span>Upload a Photo</span>
                    </label>
                    <input type='file' className="hidden" id="img" required />

                </div> */}
            </div>

            <div className="mt-6 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                    Create
                </Button>
            </div>
        </form>
    )
}

export default StudentForm;