'use client'
import TeacherDetailSmCard from "./TeacherDetailSmCard";
import BigCalendar from "./BigCalendar";
import Shortcut from "./Shortcut";
import Performance from "./PerformanceChart";
import Announcements from "./Announcements";
import UserDetailsCard from "./UserDetailsCard";
import { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from "@mui/material";
import moment from "moment";

const DetailsPage = ({scheduleTitle, detailsItems, shortcutItems, id, endPoint, dataPosition }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (id) => {
    try {
      const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${endPoint}/${id}`);
      const result = await apiResponse.json();
      setDetails(result?.data[dataPosition]);
      setLoading(false);
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchDetails(id)
  }, [id]);

  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      {console.log(details,'details')}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full lg:w-[70%]">
        <div className="flex flex-col lg:flex-row gap-2">
          <UserDetailsCard 
            name={`${details?.first_name} ${details?.last_name && details?.last_name}`}
            title={'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}
            bloodGroup={details?.blood_type}
            dateOfJoing={moment(details?.birth_date).format('DD MMM, YYYY')}
            email={details?.email}
            phone={details?.phone}
            gender={details?.gender}
            address={details?.address}
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