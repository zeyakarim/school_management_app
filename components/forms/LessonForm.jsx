import { AccessTime, AirlineSeatReclineNormal, AutoStories, EightMp, Event, School } from '@mui/icons-material';
import SelectField from '../formsFields/SelectField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import InputField from '../formsFields/InputField';
import { Button, Spinner } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useSnackBar } from '@/utils/snackbarContext';
import useAuth from '@/hooks/useAuth';

const days = [
    { "label": 'MONDAY',    "key": 'MONDAY', "id": 'MONDAY'  },
    { "label": 'TUESDAY',   "key": 'TUESDAY', "id": 'TUESDAY'},
    { "label": 'WEDNESDAY', "key": 'WEDNESDAY', "id": 'WEDNESDAY' },
    { "label": 'THURSDAY',  "key": 'THURSDAY', "id": 'THURSDAY' },
    { "label": 'FRIDAY',    "key": 'FRIDAY', "id": 'FRIDAY' },
    { "label": 'SATURDAY',  "key": 'SATURDAY', "id": 'SATURDAY' }
]

const LessonForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);
    const { authenticated } = useAuth();

    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);      

    const [formValues, setFormValues] = useState({
        lesson: data?.name || '',
        subject: data?.subject_id || '',
        class: data?.class_id || '',
        teacher: data?.teacher_id || '',
        day: data?.day || '',
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
        if (!authenticated) {
            setSnackBar({ display: true, message: `Please register with Codeial to ${formType} Lesson.`, type: "info" });
            return;
        }

        setLoading(true);
        
        const formData = {
            lesson: formValues.lesson,
            subject_id: formValues.subject,
            class_id: formValues.class,
            teacher_id: formValues.teacher,
            start_time: formatTime(event.target.startTime.value),
            end_time: formatTime(event.target.endTime.value),
            day: formValues.day
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/lessons`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/lessons/${data.id}`;

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
                const successMessage = `Lesson ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} lesson.`;
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
                <InputField
                    type="text"
                    label="Lesson"
                    name='lesson'
                    className="w-[32%] mt-1"
                    isRequired={true}
                    value={formValues.lesson}
                    onChange={handleChange}
                    icon={ <EightMp style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    name='subject'
                    className="w-[32%] mt-1"
                    datas={subjects}
                    value={formValues.subject}
                    onChange={handleChange}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[32%] mt-1"
                    datas={classes}
                    value={formValues.class}
                    onChange={handleChange}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    name='teacher'
                    className="w-[32%] mt-1"
                    datas={teachers}
                    value={formValues.teacher}
                    onChange={handleChange}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="Start Time" 
                    name='startTime'
                    value={formValues.startTime}
                    onChange={handleChange}
                    className="w-[32%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="End Time"
                    name='endTime'
                    value={formValues.endTime}
                    onChange={handleChange} 
                    className="w-[32%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Day"
                    name='day'
                    className="w-[32%] mt-1"
                    datas={days}
                    value={formValues.day}
                    onChange={handleChange}
                    icon={ <Event style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default LessonForm;