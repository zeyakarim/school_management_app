import Image from "next/image";

const FinanceChatContainer = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
      <div className="p-3 flex justify-between items-center">
        <p className="font-bold">Finance</p>
        <Image src='/moreDark.png' alt="more" width={14} height={14} />
      </div>

      {/* <BarChartData /> */}
    </div>
  )
}

export default FinanceChatContainer;