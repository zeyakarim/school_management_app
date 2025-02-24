import { Phone, Home, Bloodtype, Person, VisibilityOff, Visibility, Email } from '@mui/icons-material';
import { useState } from 'react';
import InputField from '../formsFields/InputField';
import DatePickerField from '../formsFields/DatePickerField';
import SelectField from '../formsFields/SelectField';
import { Button, Spinner } from '@nextui-org/react';
import { parseDate } from "@internationalized/date";
import { useSnackBar } from '@/utils/snackbarContext';

const genders = [
    { label: "MALE", key: "MALE", id: "MALE" },
    { label: "FEMALE", key: "FEMALE", id: "FEMALE" }
];

const TeacherForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
        const day = String(date.getDate()).padStart(2, '0');       // Add leading zero to day
      
        return `${year}-${month}-${day}`;
    };

    const [formValues, setFormValues] = useState({
        username: data?.username || '',
        email: data?.email || '',
        password: '',  // Keep empty for security
        firstName: data?.first_name || '',
        lastName: data?.last_name || '',
        phone: data?.phone || '',
        address: data?.address || '',
        bloodType: data?.blood_type || '',
        birthDate: data?.birth_date ? parseDate(getFormattedDate(new Date(data?.birth_date))) : null,  // Ensure ISO format
        gender: data?.gender || '',
        file: data?.file || ''
    });

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        const formObject = new FormData();
        const file = event.target.file?.files[0];
        const birthDate = event.target.birthDate?.value;
        const formattedBirthDate = birthDate ? new Date(birthDate).toISOString() : null;

        if (file) formObject.append("file", file);
        formObject.append("username", formValues.username);
        formObject.append("email", formValues.email);
        if (type === 'create') formObject.append("password", formValues.password);
        formObject.append("first_name", formValues.firstName);
        formObject.append("last_name", formValues.lastName);
        formObject.append("phone", formValues.phone);
        formObject.append("address", formValues.address);
        formObject.append("blood_type", formValues.bloodType);
        formObject.append("birth_date", formattedBirthDate);
        formObject.append("gender", formValues.gender);

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/teachers`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/teachers/${data.id}`;

            const response = await fetch(url, {
                method,
                body: formObject,
            });

            setLoading(false);

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);
        
            if (response.ok && result.success) {
                const successMessage = `Teacher ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} teacher.`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: errorMessage, type: "error"
                }));
            }
        } catch (error) {
            setLoading(false);
            setSnackBar((prevSnackBar) => ({
                ...prevSnackBar, display: true, message: "Something went wrong. Please try again.", type: "error"
            }));
            setReRender((prev) => !prev);
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
                    value={formValues.username}
                    onChange={handleChange}
                    icon={<Person style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type='email'
                    label='Email'
                    name='email'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.email}
                    onChange={handleChange}
                    icon={<Email style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type={isVisible ? "text" : "password"}
                    label='Password'
                    name='password'
                    className="w-[32%]"
                    isRequired={type === 'create'}
                    value={formValues.password}
                    onChange={handleChange}
                    icon={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <VisibilityOff style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />
                            ) : (
                                <Visibility style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />
                            )}
                        </button>
                    }
                />
            </div>

            <p className="text-xs text-gray-500 py-4 pl-[5px]">Personal Information</p>

            <div className="flex gap-2 flex-wrap">
                <InputField
                    type='text'
                    label='First Name'
                    name='firstName'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.firstName}
                    onChange={handleChange}
                    icon={<Person style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type='text'
                    label='Last Name'
                    name='lastName'
                    className="w-[32%]"
                    isRequired={false}
                    value={formValues.lastName}
                    onChange={handleChange}
                    icon={<Person style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type='number'
                    label='Phone'
                    name='phone'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.phone}
                    onChange={handleChange}
                    icon={<Phone style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type='text'
                    label='Address'
                    name='address'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.address}
                    onChange={handleChange}
                    icon={<Home style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type='text'
                    label='Blood Type'
                    name='bloodType'
                    className="w-[32%]"
                    isRequired={false}
                    value={formValues.bloodType}
                    onChange={handleChange}
                    icon={<Bloodtype style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <DatePickerField
                    isRequired={false}
                    label='Birth Date'
                    name='birthDate'
                    className="w-[32%]"
                    value={formValues.birthDate}
                    onChange={handleChange}
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label='Gender'
                    name='gender'
                    className="w-[32%]"
                    datas={genders}
                    value={formValues.gender}
                    onChange={handleChange}
                />
                <InputField
                    type='file'
                    label='Upload a Photo'
                    name='file'
                    value={formValues.file}
                    onChange={handleChange}
                    className="w-[32%]"
                    isRequired={type === 'create'}
                    icon={<Person style={{ fontSize: '20px' }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
            </div>

            <div className="mt-6 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg" disabled={loading ? true : false}>
                    {loading ? <Spinner size='sm' /> : type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    );
};

export default TeacherForm;