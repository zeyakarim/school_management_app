import Image from 'next/image';
import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-end gap-6 p-4 w-full">
            <div className='pt-3'>
                <Image src='/message.png' alt='messages' width={18} height={18} />
            </div>
            <div className='relative'>
                <Image src='/announcement.png' alt='announcement' width={24} height={24} className='pt-3' />
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