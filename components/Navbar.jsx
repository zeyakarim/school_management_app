'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/data';
import { usePathname } from "next/navigation";
import { Url } from "next/dist/shared/lib/router/router";

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname,'pathname')
    // Check if the current link is active
    const isActive = (path) => pathname === path;
    console.log(isActive,'isActive')

    return (
        <div className='sticky top-0' style={{ boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 0px 1px 0px rgb(0 0 0 / 0.3)"}}>
            <div className='flex items-center gap-2 px-5 pt-5 justify-center md:justify-start'>
                <Image 
                    src='/file.png'
                    alt='schoolLogo'
                    width={26}
                    height={26} 
                />
                <p className='font-semibold md:block hidden'>Alfalah School</p>
            </div>
            
            <div className="mt-4 text-sm relative overflow-hidden h-[85vh] hover:overflow-y-scroll scrollbar">
                {menuItems.map((i, index) => (
                    <div className={`flex flex-col gap-2 lg:px-3`} key={i.title}>
                        <span className="hidden lg:block text-gray-400 font-light my-4">
                            {i.title}
                        </span>
                        {i.items.map((item) => (
                            <Link
                                href={item.href}
                                key={item.label}
                                className={`flex items-center justify-center 
                                    lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md 
                                    hover:bg-[#EDF9FD] ${isActive(item?.href) ? "bg-[#C3EBFA] text-black !important" : ""}`
                                }
                            >
                                {console.log(isActive(item?.href),'isActive(item?.href)', item?.href,'href', pathname,'pathname')}
                                <Image src={item.icon} alt="" width={20} height={20} />
                                <span className="hidden lg:block">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
                </div>
            </div>
    )
}

export default Navbar;