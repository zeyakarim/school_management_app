import { Phone, Home, Person, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import InputField from '../formsFields/InputField';
import { Button } from '@nextui-org/react';

const ParentForm = ({ type, data, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [formValues, setFormValues] = useState({
        username: data?.username || '',
        email: data?.email || '',
        password: '',  // Keep empty for security
        firstName: data?.first_name || '',
        lastName: data?.last_name || '',
        phone: data?.phone || '',
        address: data?.address || '',
    });

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            username: formValues.username,
            email: formValues.email,
            password: event.target.password.value,
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            phone: formValues.phone,
            address: formValues.address
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/parents`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/parents/${data.id}`;

            const response = await fetch(url, {
                method,
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(`Parent ${type === 'create' ? 'created' : 'updated'} successfully!`);
                onClose();
            } else {
                console.error(`Failed to ${type === 'create' ? 'created' : 'updated'} parent.`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <p className="text-xs text-gray-500 py-4 pl-[5px]">Authentication Information</p>
            <div className="flex gap-2 flex-wrap">
                <InputField
                    type='text'
                    label='Username'
                    name='username'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.username}
                    onChange={handleChange}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='email'
                    label='Email'
                    name='email'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.email}
                    onChange={handleChange}
                    icon={ <Email style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type={isVisible ? "text" : "password"}
                    label='Password'
                    name='password'
                    className="w-[32%]"
                    isRequired={true}
                    value={formValues.password}
                    onChange={handleChange}
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
                    className="w-[49%]"
                    isRequired={true}
                    value={formValues.firstName}
                    onChange={handleChange}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='text'
                    label='Last Name'
                    name='lastName'
                    className="w-[49%]"
                    isRequired={false}
                    value={formValues.lastName}
                    onChange={handleChange}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='number'
                    label='Phone'
                    name='phone'
                    className="w-[49%]"
                    isRequired={true}
                    value={formValues.phone}
                    onChange={handleChange}
                    icon={ <Phone style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type='text'
                    label='Address'
                    name='address'
                    className="w-[49%]"
                    isRequired={true}
                    value={formValues.address}
                    onChange={handleChange}
                    icon={ <Home style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>

            <div className="mt-7 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                    {type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default ParentForm;