import Announcements from "@/components/Announcements";
import BarChartContainer from "@/components/BarChartContainer";
import EventCalendar from "@/components/EventCalendar";
import FinanceChatContainer from "@/components/FinanceChatContainer";
import StudentsChartContainer from "@/components/StudentsChartContainer";
import UserCards from "@/components/UserCards";

export default function Home() {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className="w-full lg:w-[70%] flex flex-col gap-8">
        <UserCards />
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* STUDENT CHART */}
          <div className="w-full lg:w-1/3 h-[400px]">
            <StudentsChartContainer />
          </div>

          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[400px]">
            <BarChartContainer />
          </div>
        </div>
        
        {/* BOTTOM CHART */}
        <div className="w-full h-[450px]">
          <FinanceChatContainer />
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-[29%]'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
