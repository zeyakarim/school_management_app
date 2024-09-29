import Image from 'next/image';
import CountChat from './CountChat';

const StudentsChartContainer = () => {
  return (
    <div className='bg-white w-ful h-full rounded'>
      <div className='flex justify-between items-center p-3'>
        <p className='font-bold'>Students</p>
        <Image src='/moreDark.png' alt='more' width={14} height={14} className='color' />
      </div>
      <CountChat />
      <div className='flex justify-center items-center gap-8'>
        <div>
          <p className='w-4 h-4 rounded-full bg-[#C3EBFA]'></p>
          <p className='font-bold'>207</p>
          <p className='text-[10px] text-gray-600'>Boys (45%)</p>
        </div>
        <div>
          <p className='w-4 h-4 rounded-full bg-[#FAE27C]'></p>
          <p className='font-bold'>253</p>
          <p className='text-[10px] text-gray-600'>Girls (55%)</p>
        </div>
        </div>
    </div>
  )
}

export default StudentsChartContainer;