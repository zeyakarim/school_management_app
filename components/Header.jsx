import { Campaign, Message } from '@mui/icons-material';
import Image from 'next/image';
import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-end gap-4 p-4 w-full shadow-md bg-white">
            <div className='pt-3'>
                <Message className='text-gray-400 text-[20px]' />
            </div>
            <div className='relative'>
                <Campaign className='pt-2 text-gray-400 text-[35px]' />
                <p className='bg-[#615fb8] text-[#fff] text-center text-xs rounded-full px-[6px] py-[2px] absolute bottom-[68%] left-[50%]'>5</p>
            </div>
            <div className='flex gap-4 items-center'>
                <div>
                    <p className='text-xs'>Zeya Karim</p>
                    <p className='text-xs text-gray-400'>admin</p>
                </div>
                <Image src='/avatar.png' alt='avatar' width={28} height={28} className='rounded-full object-cover' />
            </div>
        </div>
    )
};

export default Header;