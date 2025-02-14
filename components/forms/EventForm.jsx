import { AccessTime, AirlineSeatReclineNormal, ClosedCaptionOff } from '@mui/icons-material';
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";
import SelectField from '../formsFields/SelectField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import InputField from '../formsFields/InputField';
import { Button } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';
import DatePickerField from '../formsFields/DatePickerField';

const EventForm = ({ type, data, onClose }) => {
    const formatSubjectLabel = useCallback((item) => item?.name, []);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);

    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
        const day = String(date.getDate()).padStart(2, '0');       // Add leading zero to day
        
        return `${year}-${month}-${day}`;
    };

    const [formValues, setFormValues] = useState({
        title: data?.title || '',
        description: data?.description || '',
        class: data?.class_id || '',
        date: data?.date ? parseDate(getFormattedDate(new Date(data?.date))) : null,
        startTime: data?.start_time ? parseAbsoluteToLocal(data?.start_time) : '',
        endTime: data?.end_time ? parseAbsoluteToLocal(data?.end_time) : ''
    });

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            title: formValues?.title,
            description: formValues?.description,
            class_id: formValues?.class,
            start_time: formatTime(event.target.startTime.value),
            end_time: formatTime(event.target.endTime.value),
            date: event.target.date.value ? new Date(event.target.date.value).toISOString() : null
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/events`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/events/${data.id}`;
                
            const response = await fetch(url, {
                method,
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(`Event ${type === 'create' ? 'created' : 'updated'} successfully!`);
                onClose();
            } else {
                console.error(`Failed to ${type === 'create' ? 'create' : 'update'} event.`);
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
                    value={formValues.class}
                    onChange={handleChange}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    name='date'
                    className="w-[48%]"
                    value={formValues.date}
                    onChange={handleChange}
                />
                <TimeInputField
                    isRequired={true}
                    label="Start Time" 
                    name='startTime' 
                    className="w-[48%] mt-1"
                    value={formValues.startTime}
                    onChange={handleChange}
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="End Time"
                    name='endTime' 
                    className="w-[48%]"
                    value={formValues.endTime}
                    onChange={handleChange}
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="text"
                    label="Title"
                    name='title'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.title}
                    onChange={handleChange}
                    icon={ <ClosedCaptionOff style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />

                <InputField
                    type="description"
                    label="Description"
                    name='description'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.description}
                    onChange={handleChange}
                    icon={ <ClosedCaptionOff style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>

            <div className="mt-7 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                    {type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default EventForm;