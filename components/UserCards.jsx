import { adminDashboardCards } from "@/lib/data";
import { MoreHoriz } from '@mui/icons-material';

const UserCards = () => {
  return (
    <div className='flex justify-between gap-2 flex-wrap '>
      {adminDashboardCards?.map((card) => (
        <div key={card?.title} className='rounded-lg odd:bg-[#CFCEFF] even:bg-[#FAE27C] py-4 px-4 w-full lg:w-[185px] 2xl:w-[258px] shadow-small'>
          <div className='flex justify-between'>
            <div>
              <p className='text-[10px] text-green-500 bg-[#fff] rounded-full px-1'>{card?.session}</p> 
            </div>
            <div className="text-[16px] flex items-center">
              <MoreHoriz className='text-[#fff] hover:cursor-pointer' />
            </div>
          </div>
          <p className='font-bold py-2'>{card?.count}</p>
          <p className='text-xs text-gray-500'>{card?.title}</p>
        </div>
      ))}
    </div>
  )
}

export default UserCards