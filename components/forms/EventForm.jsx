import { AccessTime, AirlineSeatReclineNormal, ClosedCaptionOff } from '@mui/icons-material';
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";
import SelectField from '../formsFields/SelectField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import InputField from '../formsFields/InputField';
import { Button, Spinner } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';
import DatePickerField from '../formsFields/DatePickerField';
import { useSnackBar } from '@/utils/snackbarContext';
import useAuth from '@/hooks/useAuth';
import { useSession } from 'next-auth/react';

const EventForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);
    const { authenticated } = useAuth();
    const { data: session } = useSession();

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

        const formType = type === 'create' ? 'Create' : 'Update';
        if (!(session || authenticated)) {
            setSnackBar({ display: true, message: `Please register with Codeial to ${formType} Event.`, type: "info" });
            return;
        }

        setLoading(true);
        
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setLoading(false);

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);

            if (response.ok && result.success) {
                const successMessage = `Event ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} event.`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: errorMessage, type: "error"
                }));
            }
        } catch (error) {
            setLoading(false);
            setSnackBar((prevSnackBar) => ({
                ...prevSnackBar, display: true, message: "Something went wrong. Please try again.", type: "error"
            }));
            setReRender((prev) => !prev);
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
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg" disabled={loading ? true : false}>
                    {loading ? <Spinner size='sm' /> : type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default EventForm;