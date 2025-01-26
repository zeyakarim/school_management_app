'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/data';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    // Text to type
    const textToType = "Codeials Public School";

    // State for the text and typing index
    const [typedText, setTypedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (index < textToType.length) {
                setTypedText((prev) => prev + textToType[index]);
                setIndex((prevIndex) => prevIndex + 1);
            } else {
                // After typing is complete, reset the typing effect
                clearInterval(typingInterval);
                setTimeout(() => {
                    setTypedText(""); // Reset the typed text
                    setIndex(0); // Reset the index
                }, 1000); // Wait 1 second before starting again
            }
        }, 100); // Adjust typing speed (100ms per letter)

        return () => clearInterval(typingInterval); // Cleanup the interval when the component unmounts
    }, [index, textToType]);

    // Check if the current link is active
    const isActive = (path) => pathname === path;

    return (
        <div
            className="sticky top-0 h-screen flex flex-col overflow-y-auto scrollbar"
            style={{
                boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
            }}
        >
            {/* Navbar Header */}
            <div className="flex items-center gap-2 px-5 pt-5 justify-center md:justify-start">
                <Image src="/file.png" alt="schoolLogo" width={26} height={26} />
                <p
                    className="font-semibold hidden md:block text-[22px]"
                    style={{
                        color: 'black', // Black text color
                        textShadow: `
                            2px 2px 6px rgba(0, 0, 0, 0.1), 
                            0px 0px 10px rgba(0, 0, 0, 0.15)
                        `,
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