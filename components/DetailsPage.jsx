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

const DetailsPage = ({scheduleTitle, shortcutItems, id, endPoint, dataPosition }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (id) => {
    if (!id) {
      console.error("fetchDetails: ID is missing");
      return;
    }
  
    const apiUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${endPoint}/${id}`;
  
    try {
      const apiResponse = await fetch(apiUrl);
  
      // Check if response is not OK (400, 404, 500)
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json(); // Get detailed error message
        throw new Error(`API Error: ${apiResponse.status} - ${errorData.message || "Unknown Error"}`);
      }
  
      const result = await apiResponse.json();
      setDetails(result?.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };  
  

  useEffect(() => {
    setLoading(true);
    fetchDetails(id)
  }, [id]);

  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-full lg:w-[70%]">
        <div className="flex flex-col lg:flex-row gap-2">
          <UserDetailsCard 
            name={`${details?.first_name} ${details?.last_name ? details?.last_name : ''}`}
            title={'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'}
            bloodGroup={details?.blood_type}
            dateOfJoing={moment(details?.birth_date).format('DD MMM, YYYY')}
            email={details?.email}
            phone={details?.phone}
            gender={details?.gender}
            address={details?.address}
            img={details?.img}
          />
          
          <div className="flex-1 flex gap-2 justify-between flex-wrap">
            {/* CARD */}
            {details?.detailsItems?.map(({icon, number, title}) => (
              <TeacherDetailSmCard key={title} icon={icon} number={number} title={title} />
            ))}
          </div>
        </div>

        <div className="mt-4 bg-white rounded-md p-4 h-[800px] shadow-small">
          <h1>{scheduleTitle}</h1>
          <BigCalendar type="teacherId" id={id} />
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