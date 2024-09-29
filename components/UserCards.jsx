import { adminDashboardCards } from "@/data/navList";
import Image from "next/image";

const UserCards = () => {
  return (
    <div className='flex gap-4'>
      {adminDashboardCards?.map((card) => (
        <div key={card?.title} className='odd:bg-[#CFCEFF] even:bg-[#FAE27C] min-w-[184px] rounded-2xl py-4 px-4'>
          <div className='flex justify-between'>
            <p className='text-[10px] text-green-500 bg-[#fff] rounded-full px-1'>{card?.session}</p>
            <Image src='/more.png' alt='more' width={14} height={14} className='hover:cursor-pointer' />
          </div>
          <p className='font-bold py-2'>{card?.count}</p>
          <p className='text-xs text-gray-500'>{card?.title}</p>
        </div>
      ))}
    </div>
  )
}

export default UserCards