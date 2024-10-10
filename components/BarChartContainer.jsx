import Image from "next/image";
import BarChartData from "./BarChart";

const BarChartContainer = () => {
  return (
    <div className='bg-white w-full h-full rounded px-3 shadow-small'>
      <div className="p-3 flex justify-between items-center">
        <p className="font-bold">Attendance</p>
        <Image src='/moreDark.png' alt="more" width={14} height={14} />
      </div>

      <BarChartData />
    </div>
  )
}

export default BarChartContainer;