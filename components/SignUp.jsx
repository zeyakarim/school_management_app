"use client";
import Image from "next/image";
import SignUpForm from "./SignUpForm";

const SignUpComponent = ({ isOpen, onClose, openModel }) => {
    if (!isOpen) return null; // Hide the modal when isOpen is false

    // Handle outside click to close the modal
    const handleOutsideClick = (e) => {
        if (e.target.id === "modal-overlay") {
            onClose();
        }
    };

    return (
        <div id="modal-overlay" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
            {/* Modal Container */}
            <div className="bg-[#B0D8DA] w-[80vw] h-[80vh] flex rounded-[20px] relative" style={{ border: "6px solid #fff" }}>

                {/* Left Section */}
                <div className="w-[30%] p-8 relative hidden md:block">
                    <Image src="/schoolLogo.png" alt="schoolLogo" width={55} height={50} />
                    <h1 className="text-white text-[26px] mt-3">Welcome to <br /> Codeial Public School</h1>
                    <Image 
                        src="/3d.png" 
                        alt="3d" 
                        width={400} 
                        height={400} 
                        className="rounded-lg object-contain absolute bottom-[18px] right-[-15%] h-[500px]"
                    />
                </div>

                {/* Right Section (SignUp Form) */}
                <div className="relative overflow-hidden md:static md:overflow-visible  w-full md:w-[70%] p-8 bg-[#fff] rounded-[20px] flex items-center justify-center h-full">
                    <SignUpForm onClose={onClose} openModel={openModel} />

                    {/* Top Right Semi-Circle */}
                    <div className="w-24 h-24 bg-[#5ABBC2] rounded-full absolute top-[-40px] right-[-40px] block md:hidden"></div>

                    {/* Bottom Left Semi-Circle */}
                    <div className="w-36 h-36 bg-[#5ABBC2] rounded-full absolute bottom-[-80px] left-[-80px] block md:hidden"></div>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;