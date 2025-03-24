'use client'
import useAuth from '@/hooks/useAuth';
import { reset } from '@/redux/slices/authSlice';
import { Campaign, Message } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import SignUpComponent from './SignUp';
import SignInComponent from './SignIn';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const { authenticated, loading, user } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(reset());
        router.push("/signin");
    };

    const handleSignUp = () => {
        router.push("/signup");
    }

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
                    <p className='text-xs'>{user?.full_name}</p>
                    <p className='text-xs text-gray-400'>admin</p>
                </div>
                <Image src='/avatar.png' alt='avatar' width={28} height={28} className='rounded-full object-cover' />
            </div>

            <div>
                {authenticated ? (
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-[#5ABBC2] text-white hover:bg-[#4AA3A9] transition rounded-full text-[14px] font-semibold shadow-xl"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Sign Up
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className="px-6 py-2 bg-[#5ABBC2] text-white hover:bg-[#4AA3A9] transition rounded-full text-[14px] font-semibold shadow-xl"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>

            <SignUpComponent
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                openModel={() => setIsSignInModalOpen(true)}
            />

            <SignInComponent
                isOpen={isSignInModalOpen} 
                openModel={() => setIsModalOpen(true)} 
                onClose={() => setIsSignInModalOpen(false)} 
            />
        </div>
    )
};

export default Header;