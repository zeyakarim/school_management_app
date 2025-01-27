'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/data';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    // Text to type
    const textToType = "Codeial Public School";

    // State for the text and typing index
    const [typedText, setTypedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true); // Track typing or erasing state

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isTyping) {
                // Typing phase
                if (index < textToType.length) {
                    setTypedText((prev) => prev + textToType[index]);
                    setIndex((prevIndex) => prevIndex + 1);
                } else {
                    setIsTyping(false); // Switch to erasing phase
                }
            } else {
                // Erasing phase
                if (index > 0) {
                    setTypedText((prev) => prev.slice(0, -1)); // Remove the last character
                    setIndex((prevIndex) => prevIndex - 1);
                } else {
                    setIsTyping(true); // Switch back to typing phase
                }
            }
        }, 100); // Adjust speed for both typing and erasing

        return () => clearInterval(typingInterval); // Cleanup interval on unmount
    }, [index, isTyping, textToType]);

    // Check if the current link is active
    const isActive = (path) => pathname === path;

    return (
        <div
            className="sticky top-0 h-screen flex flex-col overflow-y-auto scrollbar shadow-lg"
            // style={{ boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 0px 1px 0px rgb(0 0 0 / 0.3)' }}
        >
            {/* Navbar Header */}
            <div className="flex items-center gap-2 pr-5 pt-5 justify-center md:justify-start" style={{ paddingLeft:5}}>
                <Image src="/school-building-removebg-preview.png" alt="schoolLogo" width={55} height={50} />
                <p
                    className="font-semibold hidden md:block text-[22px] h-[40px]"
                    style={{
                        color: 'black', // Black text color
                        textShadow: `
                            1px 1px 2px rgba(255, 255, 255, 0.3),  /* Light outer glow */
                            2px 2px 4px rgba(0, 0, 0, 0.5),       /* Dark soft shadow */
                            0px 6px 12px rgba(0, 0, 0, 0.2);
                        `
                    }}
                >
                    {typedText}
                </p>
            </div>

            {/* Navbar Links */}
            <div className="mt-4 text-sm relative overflow-y-auto scrollbar">
                {menuItems.map((i) => (
                    <div className="flex flex-col gap-2 lg:px-3" key={i.title}>
                        <span className="hidden lg:block text-gray-500 font-[500] my-4">{i.title}</span>
                        {i?.items.map((item) => (
                            <Link
                                href={item.href}
                                key={item.label}
                                className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md hover:bg-[#EDF9FD] ${
                                    isActive(item?.href) ? 'bg-[#C3EBFA] text-black font-semibold' : 'text-gray-500'
                                }`}
                            >
                                {item.icon && <span>{item.icon}</span>}
                                <span className="hidden lg:block">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;