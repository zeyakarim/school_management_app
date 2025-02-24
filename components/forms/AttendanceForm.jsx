import { AirlineSeatReclineNormal, AutoStories, Person, School, Attribution } from '@mui/icons-material';
import SelectField from "../formsFields/SelectField";
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import DatePickerField from '../formsFields/DatePickerField';
import { parseDate } from '@internationalized/date';
import { useSnackBar } from '@/utils/snackbarContext';

const AttendanceForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);

    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: students, loading: studentsLoading } = useFetchData("students", formatTeacherLabel);
    const { data: lessons, loading: lessonsLoading } = useFetchData("lessons", formatSubjectLabel);
    
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
        const day = String(date.getDate()).padStart(2, '0');       // Add leading zero to day
        
        return `${year}-${month}-${day}`;
    };

    const [formValues, setFormValues] = useState({
        subject: data?.subject_id || '',
        class: data?.class_id || '',
        teacher: data?.teacher_id || '',
        student: data?.student_id || '',
        lesson: data?.lesson_id || '',
        present: data?.present ? 'TRUE': 'FALSE',
        date: data?.date ? parseDate(getFormattedDate(new Date(data?.date))) : null
    });

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        const formData = {
            subject_id: formValues?.subject,
            class_id: formValues?.class,
            student_id: formValues?.student,
            teacher_id: formValues?.teacher,
            lesson_id: formValues?.lesson,
            present: event.target.present.value,
            date: event.target.date.value ? new Date(event.target.date.value).toISOString() : null
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/attendances`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/attendances/${data.id}`;

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
                const successMessage = `Attendance ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} attendance.`;
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

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="flex gap-3 flex-wrap justify-between">
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Present"
                    name='present'
                    className="w-[48%]"
                    datas={[{"label": 'TRUE', "key": 'TRUE', "id": 'TRUE' }, { "label": 'FALSE', "key": 'FALSE', "id": 'FALSE' }]}
                    value={formValues.present}
                    onChange={handleChange}
                    icon={ <Attribution style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    name='date'
                    className="w-[48%]"
                    value={formValues.date}
                    onChange={handleChange}
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Lesson Name"
                    name='lesson'
                    className="w-[48%]"
                    datas={lessons}
                    value={formValues.lesson}
                    onChange={handleChange}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    name='subject'
                    className="w-[48%]"
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
                    className="w-[48%]"
                    datas={classes}
                    value={formValues.class}
                    onChange={handleChange}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Student"
                    name='student'
                    className="w-[48%]"
                    datas={students}
                    value={formValues.student}
                    onChange={handleChange}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    name='teacher'
                    className="w-[48%]"
                    datas={teachers}
                    value={formValues.teacher}
                    onChange={handleChange}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default AttendanceForm;