'use client'
import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const events = [
    {
        title: "Book Fair",
        time: "10:00 PM - 12:00 PM",
        description: "Browse and purchase books at our annual school Book Fair"
    },
    {
        title: "Sports Day",
        time: "12:00 PM - 2:00 PM",
        description: "A fun-filled day of athletic events and team compitions"
    },
    {
        title: "Art Exhibition",
        time: "2:00 PM - 4:00 PM",
        description: "Display your artwork for the school community to admire"
    }
]

const EventCalendar = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <div className='p-4 bg-white rounded-md shadow-small'>
                <Calendar onChange={onChange} value={value} />
            </div>

            <div className='bg-white rounded-md mt-3 p-4 shadow-small'>
                <div className='flex justify-between items-center'>
                    <p className='font-semibold'>Events</p>
                    <Image src='/moreDark.png' alt='moreDark' width={16} height={16} />
                </div>

                <div className='flex flex-col gap-4 pt-2'>
                    {events?.map((event, index) => (
                        <div key={index} className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[#C3EBFA] even:border-t-[#CFCEFF]">
                            <div className='flex justify-between items-center'>
                                <p className='text-sm'>{event.title}</p>
                                <p className='text-gray-400 text-xs'>{event.time}</p>
                            </div>
                            <p className='text-gray-500 text-xs'>{event?.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EventCalendar;