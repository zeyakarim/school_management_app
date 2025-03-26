"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import InputField from "./formsFields/InputField";
import { Email, Person, Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { Button, Spinner } from "@nextui-org/react";
import { useSnackBar } from "@/utils/snackbarContext";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";

const SignUpForm = ({ onClose, openModel }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { setSnackBar } = useSnackBar();

    const [formValues, setFormValues] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
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

        const data = {
            full_name: formValues?.fullName || "",
            username: formValues?.username || "",
            email: formValues?.email || "",
            password: formValues?.password || "",
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/admins/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            setLoading(false);

            const result = await response.json();

            if (response.ok && result.success) {
                setSnackBar({
                    display: true,
                    message: "Admin Created Successfully!",
                    type: "success",
                });
                openModel();
            } else {
                setSnackBar({
                    display: true,
                    message: result?.message || "Failed to create admin.",
                    type: "error",
                });
            }
        } catch (error) {
            setLoading(false);
            setSnackBar({
                display: true,
                message: "Something went wrong. Please try again.",
                type: "error",
            });
        }
    };

    const handleGoogleSignIn = async () => {
        signIn("google", { callbackUrl: "/" }); // Redirect to home after signing in
    };

    const handleSignIn = () => {
        onClose();
        openModel();
    };

    return (
        <div className="w-full md:w-[70%] relative">
            {/* Close Button */}
            <Tooltip title="Close" placement="right">
                <IconButton 
                    onClick={onClose}
                    className="absolute top-3 right-3 hover:bg-[#4AA3A9] rounded-full shadow-md transition p-1"
                    style={{ backgroundColor: '#5ABBC2', position:'absolute' }}
                >
                    <Close className="text-white" style={{ fontSize: "16px" }} />
                </IconButton>
            </Tooltip>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center">Create Account</h2>

            {/* Google Sign-In Button */}
            <div className="flex justify-center md:mt-4">
                <Button
                    type="button"
                    radius="md"
                    className="bg-white text-gray-700 mt-1 md:mt-4 font-bold text-[16px] flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition shadow-lg"
                    onClick={handleGoogleSignIn}
                >
                    <Image src="https://img.icons8.com/color/48/google-logo.png" width={20} height={20} alt="Google" className="mr-2" />
                    Sign up with Google
                </Button>
            </div>

            {/* Form */}
            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    label="Full Name"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleChange}
                    isRequired={true}
                    placeholder="example : Ryan Rock"
                    icon={<Person style={{ fontSize: "20px" }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type="text"
                    label="Username"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    isRequired={true}
                    placeholder="example : ryanrock"
                    icon={<Person style={{ fontSize: "20px" }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type="email"
                    label="Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    isRequired={true}
                    placeholder="example : ryan56@gmail.com"
                    icon={<Email style={{ fontSize: "20px" }} className="text-default-400 pointer-events-none flex-shrink-0" />}
                />
                <InputField
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    isRequired={true}
                    placeholder="Enter your password"
                    icon={
                        <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                            {isVisible ? (
                                <VisibilityOff style={{ fontSize: "20px" }} className="text-default-400 pointer-events-none flex-shrink-0" />
                            ) : (
                                <Visibility style={{ fontSize: "20px" }} className="text-default-400 pointer-events-none flex-shrink-0" />
                            )}
                        </button>
                    }
                />

                {/* Submit Button */}
                <Button type="submit" radius="md" className="bg-[#5ABBC2] text-white mt-4 font-bold text-[16px]" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Create Account"}
                </Button>
            </form>

            {/* Switch to Sign In */}
            <div className="flex flex-row gap-2 mt-5 text-center">
                <p className="text-[#B9B9B9]">Already have an account?</p>
                <p className="text-[#5ABBC2] cursor-pointer" onClick={handleSignIn}>
                    Login
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;