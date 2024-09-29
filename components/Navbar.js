'use client'
import React from 'react'
import Image from 'next/image';
import { navLists, otherLists } from '@/data/navList';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
        <div className='flex items-center gap-2 px-5 pt-5 justify-center md:justify-start'>
            <Image 
                src='/logo.png'
                alt='schoolLogo'
                width={26}
                height={26} 
            />
            <p className='font-semibold hidden md:block'>Alfalah School</p>
        </div>
        
        <div >
            <p className='text-gray-400 text-xs pb-2 pt-6 px-5 '>MENU</p>
            <div className='px-5 py-2 overflow-hidden h-[80vh] hover:overflow-y-scroll scrollbar'>
                {navLists?.map((nav) => (
                    <Link key={nav?.title} className='flex items-center gap-4 py-2 px-2 justify-center md:justify-start hover:cursor-pointer hover:bg-slate-100' href={nav?.link}>
                        <Image 
                            src={nav?.icon} 
                            alt={nav?.title}
                            height={16}
                            width={16} 
                        />
                        <p className='text-sm text-gray-500 hidden md:block'>{nav?.title}</p>
                    </Link>
                ))}

                <div className='pt-6'>
                    <p className='text-gray-400 text-xs pb-2'>OTHER</p>
                    {otherLists?.map((list) => (
                        <div key={list?.title} className='flex items-center gap-4 py-2 px-2 justify-center md:justify-start hover:cursor-pointer hover:bg-slate-100'>
                            <Image 
                                src={list?.icon} 
                                alt={list?.title}
                                height={16}
                                width={16} 
                            />
                            <p className='text-sm text-gray-500 hidden md:block'>{list?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;