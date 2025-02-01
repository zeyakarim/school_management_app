import FinanceChat from "./FinanceChat";
import { MoreHoriz } from '@mui/icons-material';

const FinanceChatContainer = () => {
  return (
    <div className='bg-white rounded w-full h-full p-4 mb-2 shadow-small'>
      <div className="p-3 flex justify-between items-center">
        <p className="font-bold">Finance</p>
        <MoreHoriz className='text-gray-400' />
      </div>

      <FinanceChat />
    </div>
  )
}

export default FinanceChatContainer;