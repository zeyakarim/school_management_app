"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
moment.tz.setDefault("Asia/Kolkata"); // Set default time zone to Asia/Kolkata
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ id }) => {
    const [view, setView] = useState(Views.WORK_WEEK); // Default view is Work Week
    const [teacherSchedules, setTeacherSchedules] = useState([]); // State to hold fetched schedule data
    const [error, setError] = useState(null); // State to manage error messages

    const handleOnChangeView = (selectedView) => {
        setView(selectedView); // Update the view when the user switches views
    };

    // Fetch teacher's schedule based on teacher ID
    const fetchDetails = async (id) => {
        if (!id) {
            console.error("fetchDetails: ID is missing");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/teachers/${id}/schedules`; // API endpoint for teacher's schedules

        try {
            const apiResponse = await fetch(apiUrl);

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json();
                throw new Error(
                `API Error: ${apiResponse.status} - ${errorData.message || "Unknown Error"}`
                );
            }

            const results = await apiResponse.json();

            const schedules = results?.data?.map((schedule) => {
                const startTime = moment.tz(schedule.start_time, "Asia/Kolkata").toDate(); // Convert to Asia/Kolkata timezone
                const endTime = moment.tz(schedule.end_time, "Asia/Kolkata").toDate(); // Convert to Asia/Kolkata timezone

                return {
                    title: `${schedule.subject} (${schedule.class})`, // Event title with Subject and Class
                    start: startTime, // Start time in Date format
                    end: endTime, // End time in Date format
                    allDay: false, // Mark as a specific time event
                    resource: schedule.class, // Optional: You can track resources like class
                };
            });

            setTeacherSchedules(schedules); // Set the fetched schedule to state
        } catch (error) {
            console.error("Error fetching details:", error);
            setError("Error fetching schedules. Please try again later."); // Error handling
        }
    };

    useEffect(() => {
        if (id) {
            fetchDetails(id); // Fetch schedule data when component mounts or ID changes
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>; // Display error message if there's an issue fetching data
    }

    // Min and Max time for calendar display (9 AM to 2 PM)
    const customMinTime = new Date(2025, 1, 0, 9, 0, 0); // 9:00 AM
    const customMaxTime = new Date(2025, 1, 0, 14, 0, 0); // 2:00 PM

    // Function to handle time slot selection and prevent selection during break time
    const handleSelectSlot = ({ start, end }) => {
        const startTime = moment(start);
        const endTime = moment(end);

        // Check if the selected time slot is during the break time (11:45 AM - 12:00 PM)
        if (
            startTime.isBetween("2025-04-07T11:45:00", "2025-04-07T12:00:00", null, "[)")
        ) {
            alert("This slot is during the break time (11:45 AM - 12:00 PM). Please select another time.");
            return;
        }

        // If you want to add event creation functionality, you can handle it here
        console.log("Selected slot:", startTime.format(), "to", endTime.format());
    };

    console.log(teacherSchedules,'teacherSchedules')
    return (
        <Calendar
            localizer={localizer}
            events={teacherSchedules} // Pass the schedule events to the calendar
            startAccessor="start" // Property name for event start time
            endAccessor="end" // Property name for event end time
            views={["work_week", "day"]} // Available views: Work Week and Day
            view={view} // Current active view
            style={{ height: "98%" }} // Set calendar height
            onView={handleOnChangeView} // Handle view change
            min={customMinTime} // Min time limit (9:00 AM)
            max={customMaxTime} // Max time limit (2:00 PM)
            step={45} // 45-minute time intervals
            timeslots={1} // Slot duration (1 for each step, which is 45 minutes here)
            messages={{
                noEventsInRange: "No events scheduled", // Custom message for no events in the range
            }}
            onSelectSlot={handleSelectSlot} // Handle time slot selection
        />
    );
};

export default BigCalendar;
