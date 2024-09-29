import BarChartContainer from "@/components/BarChartContainer";
import StudentsChartContainer from "@/components/StudentsChartContainer";
import UserCards from "@/components/UserCards";

export default function Home() {
  return (
    <div className='flex flex-wrap px-4 gap-2'>
      {/* LEFT */}
      <div className="w-[70%]">
        <UserCards />
        <div className="flex justify-between items-center gap-2">
          {/* STUDENT CHART */}
          <div className="w-full lg:w-1/3 pt-4 h-[430px]">
            <StudentsChartContainer />
          </div>

          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 pt-4 h-[430px]">
            <BarChartContainer />
          </div>
        </div>
        
      </div>

      {/* RIGHT */}
      <div className='w-[29%]'>r</div>
    </div>
  );
}
