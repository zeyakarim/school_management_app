import BarChartData from "./BarChart";
import { MoreHoriz } from '@mui/icons-material';

const BarChartContainer = () => {
  return (
    <div className='bg-white w-full h-full rounded px-3 shadow-small'>
      <div className="p-3 flex justify-between items-center">
        <p className="font-bold">Attendance</p>
        <MoreHoriz className='text-gray-400' />
      </div>

      <BarChartData />
    </div>
  )
}

export default BarChartContainer;