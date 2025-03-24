'use client'
import React, { useState } from 'react'
import InputField from './formsFields/InputField'
import { Close, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Spinner } from '@nextui-org/react';
import { useSnackBar } from '@/utils/snackbarContext';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';
import { IconButton, Tooltip } from '@mui/material';

const SignInForm = ({ onClose, openModel }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { setSnackBar } = useSnackBar();
    const router = useRouter();
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        const data = {
            username: formValues?.username || '',
            password: formValues?.password || ''
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/admins/signin`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            setLoading(false);

            const result = await response.json();
        
            if (response.ok && result.success) {
                onClose();
                const successMessage = `Admin Signed Successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
                dispatch(setAuth({ user: result.data, authenticated: true }))
                router.push('/')
            } else {
                const errorMessage = result?.message || `Failed to sign admin.`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: errorMessage, type: "error"
                }));
            }
        } catch (error) {
            setLoading(false);
            setSnackBar((prevSnackBar) => ({
                ...prevSnackBar, display: true, message: "Something went wrong. Please try again.", type: "error"
            }));
        }
    }

    const handleSignUp = () => {
        onClose();
        openModel();
    };

    return (
        <div className='w-[70%] relative'>
            <Tooltip title="Close" placement="right">
                <IconButton 
                    onClick={onClose}
                    className="absolute top-3 right-[12px] hover:bg-[#4AA3A9] rounded-full shadow-md transition p-1"
                    style={{ backgroundColor: '#5ABBC2' }}
                >
                    <Close className="text-white" style={{ fontSize: "16px" }} />
                </IconButton>
            </Tooltip>

            <h2 className='text-3xl font-bold text-center'>Sign In Account</h2>
            <form method="post" className='mt-8 flex flex-col gap-5' onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    label="Username"
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    isRequired={true}
                    placeholder='example : ryanrock'
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField 
                    type={isVisible ? "text" : "password"}
                    label='Password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    isRequired={true}
                    placeholder='enter your password'
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

                <Button type="submit" radius="md" className="bg-[#5ABBC2] text-white mt-4 font-bold text-[16px]" disabled={loading ? true : false}>
                    {loading ? <Spinner size='sm' /> : 'Sign In'}
                </Button>
            </form>
            <div className='flex flex-row gap-2 mt-5'>
            <p className="text-[#B9B9B9]">Don&apos;t have an account?</p>
                <p className='text-[#5ABBC2] cursor-pointer' onClick={handleSignUp}>Sign Up</p>
            </div>
        </div>
    )
}

export default SignInForm