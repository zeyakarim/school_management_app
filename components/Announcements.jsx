import Link from "next/link";

const announcements = [
    {
        title: "Picture Day Reminder",
        time: "03/10/2024",
        description: "School Picture day is tomorrow! Don't forget to wear your full uniform and bring your best smile."
    },
    {
        title: "Book Fair Opening",
        time: "04/10/2024",
        description: "The annual book fair will open this Thrusday. Stop by the library to browse the newest books."
    },
    {
        title: "Sports Day Postponed",
        time: "05/10/2024",
        description: "Due to weather, Sports day has been postponed. A new date will be announced soon."
    }
]

const Announcements = () => {
    return (
        <div className='bg-white rounded-md mt-3 p-4 shadow-small'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold'>Announcements</p>
                <Link href="/announcements" className="text-xs text-[#1976D2] hover:underline">
                    View All
                </Link>
            </div>

            <div className='flex flex-col gap-3 pt-2'>
                {announcements?.map((event, index) => (
                    <div key={index} className="p-4 rounded-md odd:bg-[#EDF9FD] even:bg-[#F1F0FF]">
                        <div className='flex justify-between items-center'>
                            <p className='text-sm'>{event.title}</p>
                            <p className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">{event.time}</p>
                        </div>
                        <p className='text-gray-400 text-xs'>{event?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Announcements;