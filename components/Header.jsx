'use client'
import useAuth from '@/hooks/useAuth';
import { reset } from '@/redux/slices/authSlice';
import { Campaign, Message } from '@mui/icons-material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SignUpComponent from './SignUp';
import SignInComponent from './SignIn';
import { useSession, signOut } from "next-auth/react";
import AnnouncementDialog from './AnnouncementPopup';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false)
    const [announcementCount, setAnnouncementCount] = useState(null);
    const [announcements, setAnnouncements] = useState([])
    const [page, setPages] = useState(1);
    const [maxPages, setMaxPage] = useState(1);
    const { authenticated, loading, user } = useAuth();
    const dispatch = useDispatch();
    const { data: session } = useSession();

    const handleLogout = () => {
        if (session) {
            signOut();
        }
        dispatch(reset());
    };

    // const fetchAnnouncement = async () => {
    //     const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/annoucements/counts`)
    //     const result = await apiResponse.json();
    //     setAnnouncementCount(result?.data)
    // }

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/annoucements?page=${page}`);
            const data = await res.json(); // Convert response to JSON
            setAnnouncements(data?.data?.annoucements)
            setAnnouncementCount(data?.data?.totalRows)
        } catch (error) {
            console.error("Error fetching annoucements:", error);
        }
    }

    const fetchMoreData = async () => {
        if (maxPages >= page) {
            setTimeout(async () => { // Move `async` here
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/announcements?page=${page}`);
                    const data = await res.json(); // Convert response to JSON
                
                    if (data.data.maxPage >= page) {
                        setPages(page + 1);
                    }
                    
                    setAnnouncements((prev) => [...prev, ...data?.data?.annoucements]);
                } catch (error) {
                    console.error("Error fetching annoucements:", error);
                }
            }, 1500);
        }
    };
      

    useEffect(() => {
        fetchData()
        // fetchAnnouncement()
    }, [])
    
    return (
        <div className="flex items-center justify-end gap-4 p-4 w-full shadow-md bg-white">
            <div className='pt-2'>
                <Message className='text-gray-400 text-[20px]' />
            </div>
            <div className='relative cursor-pointer' onClick={() => setIsAnnouncementModalOpen(true)}>
                <Campaign className='pt-2 text-gray-400 text-[38px]' />
                <p className='bg-[#615fb8] text-[#fff] text-center text-xs rounded-full px-[6px] py-[2px] absolute bottom-[68%] left-[50%]'>{announcementCount}</p>
            </div>
            <div className='flex gap-4 items-center'>
                <div>
                    <p className='text-xs capitalize'>{session ? session.user?.name : user?.full_name}</p>
                    <p className='text-xs text-gray-400'>admin</p>
                </div>
                <Image src='/avatar.png' alt='avatar' width={28} height={28} className='rounded-full object-cover' />
            </div>

            <div>
                {(session || authenticated) ? (
                    <button 
                        type="button" 
                        className="px-6 py-2 bg-[#5ABBC2] text-white hover:bg-[#4AA3A9] transition rounded-full text-[14px] font-semibold shadow-xl"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-[#5ABBC2] text-white hover:bg-[#4AA3A9] transition rounded-full text-[14px] font-semibold shadow-xl"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Sign Up
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

            <AnnouncementDialog
                isOpen={isAnnouncementModalOpen}
                onClose={() => setIsAnnouncementModalOpen(false)}
                setOpen={setIsAnnouncementModalOpen}
                announcements={announcements}
                fetchMoreData={fetchMoreData}
                maxPages={maxPages}
                page={page}
            />
        </div>
    )
};

export default Header;