import Image from "next/image";
import FinanceChat from "./FinanceChat";

const FinanceChatContainer = () => {
  return (
    <div className='bg-white rounded w-full h-full p-4 mb-2 shadow-small'>
      <div className="p-3 flex justify-between items-center">
        <p className="font-bold">Finance</p>
        <Image src='/moreDark.png' alt="more" width={14} height={14} />
      </div>

      <FinanceChat />
    </div>
  )
}

export default FinanceChatContainer;