import Image from 'next/image';
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4'>
        <div className='flex items-center px-2 rounded-full ring-[1.5px] ring-gray-300'>
            <Image src='/search.png' alt='search' width={14} height={14} />
            <input type='text' placeholder='Search...' className='bg-transparent w-[200px] outline-none px-2' />
        </div>

        <div className='flex items-center gap-6'>
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
    </div>
  )
}

export default Header;