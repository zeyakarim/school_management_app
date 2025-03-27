import { AirlineSeatReclineNormal, ClosedCaptionOff } from '@mui/icons-material';
import SelectField from '../formsFields/SelectField';
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import InputField from '../formsFields/InputField';
import { Button, Spinner } from '@nextui-org/react';
import DatePickerField from '../formsFields/DatePickerField';
import { parseDate } from '@internationalized/date';
import { useSnackBar } from '@/utils/snackbarContext';
import useAuth from "@/hooks/useAuth";
import { useSession } from 'next-auth/react';

const AnnouncementForm = ({ type, data, onClose, setReRender }) => {
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

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [formValues, setFormValues] = useState({
        title: data?.title || '',
        description: data?.description || '',
        class: data?.class_id || '',
        date: data?.date ? parseDate(getFormattedDate(new Date(data?.date))) : null
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formType = type === 'create' ? 'Create' : 'Update';
        if (!(session || authenticated)) {
            setSnackBar({ display: true, message: `Please register with Codeial to ${formType} Announcement.`, type: "info" });
            return;
        }
    
        setLoading(true);
    
        const formData = {
            title: formValues?.title,
            description: formValues?.description,
            class_id: formValues?.class,
            date: event.target.date.value ? new Date(event.target.date.value).toISOString() : null
        };
    
        try {  
            const method = type === 'create' ? 'POST' : 'PUT'; 
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/annoucements`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/annoucements/${data.id}`;
    
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json().catch(() => null); // Handle potential JSON parse errors
            onClose()
            setLoading(false);
    
            if (response.ok && result?.success) {
                setSnackBar({
                    display: true,
                    message: `Announcement ${type === 'create' ? 'created' : 'updated'} successfully!`,
                    type: "success",
                });
            } else {
                setSnackBar({
                    display: true,
                    message: result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} announcement.`,
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error submitting announcement:", error);
            setSnackBar({
                display: true,
                message: "Something went wrong. Please try again.",
                type: "error",
            });
        } finally {
            setReRender((prev) => !prev); // Ensure rerender happens once
        }
    };    

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

export default AnnouncementForm;