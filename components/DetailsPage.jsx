
import TeacherDetailSmCard from "./TeacherDetailSmCard";
import BigCalendar from "./BigCalendar";
import Shortcut from "./Shortcut";
import Performance from "./PerformanceChart";
import Announcements from "./Announcements";
import UserDetailsCard from "./UserDetailsCard";

const DetailsPage = ({scheduleTitle, detailsItems, shortcutItems, id }) => {
    return (
      <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col lg:flex-row gap-2">
            <UserDetailsCard 
              name={'Zeya Karim'}
              title={'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}
              bloodGroup={'A+'}
              dateOfJoing={'10/10/2024'}
              email={'zeya.karim87@gmail.com'}
              phone={'136-467-365'}
            />
            
            <div className="flex-1 flex gap-2 justify-between flex-wrap">
              {/* CARD */}
              {detailsItems?.map(({icon, number, title}) => (
                <TeacherDetailSmCard key={title} icon={icon} number={number} title={title} />
              ))}
            </div>
          </div>

          <div className="mt-4 bg-white rounded-md p-4 h-[800px] shadow-small">
            <h1>{scheduleTitle}</h1>
            <BigCalendar type="teacherId" />
          </div>
        </div>

        <div className='w-full lg:w-[29%] flex flex-col gap-4'>
          <Shortcut shortcutItems={shortcutItems} id={id} />
          <Performance />
          <Announcements />
        </div>
      </div>
    )
}

export default DetailsPage