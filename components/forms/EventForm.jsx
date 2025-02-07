import { AccessTime, AirlineSeatReclineNormal, AutoStories, CalendarMonth, EightMp, Event, School } from '@mui/icons-material';
import { Time } from "@internationalized/date";
import SelectField from '../formsFields/SelectField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';
import InputField from '../formsFields/InputField';
import { Button } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';
import DatePickerField from '../formsFields/DatePickerField';

const EventForm = ({ onClose }) => {
    const formatSubjectLabel = useCallback((item) => item?.name, []);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            title: event.target.title.value,
            description: event.target.description.value,
            class_id: event.target.class.value,
            start_time: formatTime(event.target.startTime.value),
            end_time: formatTime(event.target.endTime.value),
            date: event.target.date.value ? new Date(event.target.date.value).toISOString() : null
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/events`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Event created successfully!");
                onClose();
            } else {
                console.error("Failed to create event.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="flex gap-3 flex-wrap justify-between">
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[48%]"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    name='date'
                    className="w-[48%]"
                />
                <TimeInputField
                    isRequired={true}
                    label="Start Time" 
                    name='startTime'
                    defaultValue={new Time(9, 0)} 
                    className="w-[48%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="End Time"
                    name='endTime'
                    defaultValue={new Time(12)} 
                    className="w-[48%]"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="text"
                    label="Title"
                    name='title'
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <CalendarMonth style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />

                <InputField
                    type="description"
                    label="Description"
                    name='description'
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <CalendarMonth style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>

            <div className="mt-7 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                    Create
                </Button>
            </div>
        </form>
    )
}

export default EventForm;