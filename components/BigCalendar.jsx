"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";

import moment from "moment";
import 'moment-timezone'
moment.tz.setDefault('Asia/Kolkata')
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { calendarEventsUpdate } from "@/lib/data";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
    const [view, setView] = useState(Views.WORK_WEEK);

    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
    };

    return (
        <Calendar
            localizer={localizer}
            events={calendarEventsUpdate}
            startAccessor="startDate"
            endAccessor="endDate"
            views={["work_week", "day"]}
            view={view}
            style={{ height: "98%" }}
            onView={handleOnChangeView}
            min={new Date(2025, 1, 0, 8, 0, 0)}
            max={new Date(2025, 1, 0, 15, 0, 0)}
            messages={{
                noEventsInRange: "No events scheduled", // Custom message for no events
            }}
        />
    );
};

export default BigCalendar;