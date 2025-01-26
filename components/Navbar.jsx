'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/data';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    // Check if the current link is active
    const isActive = (path) => pathname === path;

    return (
        <div
            className="sticky top-0 h-screen flex flex-col overflow-y-auto scrollbar"
            style={{ boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 0px 1px 0px rgb(0 0 0 / 0.3)' }}
        >
            {/* Navbar Header */}
            <div className="flex items-center gap-2 px-5 pt-5 justify-center md:justify-start">
                <Image src="/file.png" alt="schoolLogo" width={26} height={26} />
                <p className="font-semibold hidden md:block">Alfalah School</p>
            </div>

            {/* Navbar Links */}
            <div className="mt-4 text-sm relative overflow-y-auto scrollbar">
                {menuItems.map((i) => (
                    <div className="flex flex-col gap-2 lg:px-3" key={i.title}>
                        <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
                        {i?.items.map((item) => (
                            <Link
                                href={item.href}
                                key={item.label}
                                className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-[#EDF9FD] ${
                                    isActive(item?.href) ? "bg-[#C3EBFA] text-black font-semibold" : ""
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