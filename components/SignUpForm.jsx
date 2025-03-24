"use client";
import React, { useState } from "react";
import InputField from "./formsFields/InputField";
import { Email, Person, Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { Button, Spinner } from "@nextui-org/react";
import { useSnackBar } from "@/utils/snackbarContext";
import { useRouter } from "next/navigation";
import { IconButton, Tooltip } from "@mui/material";

const SignUpForm = ({ onClose, openModel }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { setSnackBar } = useSnackBar();
    const router = useRouter();

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
                router.push("/signin");
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

    const handleSignIn = () => {
        onClose();
        openModel();
    };

    return (
        <div className="w-[70%] relative">
            {/* Close Button */}
            <Tooltip title="Close">
                <IconButton 
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-[#5ABBC2] rounded-full shadow-md hover:bg-[#4AA3A9] transition"
                    style={{ padding: '4px' }}
                >
                    <Close className="text-white" style={{ fontSize: "16px" }} />
                </IconButton>
            </Tooltip>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center">Create Account</h2>

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
