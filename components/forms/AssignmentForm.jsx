import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";
import DatePickerField from "../formsFields/DatePickerField";
import { AirlineSeatReclineNormal, Assignment, AutoStories, School } from '@mui/icons-material';
import { useCallback, useState } from "react";
import useFetchData from "@/utils/useFetchData";
import { Button } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

const AssignmentForm = ({ type, data, onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: lessons, loading: lessonsLoading } = useFetchData("lessons", formatSubjectLabel);

    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
        const day = String(date.getDate()).padStart(2, '0');       // Add leading zero to day
        
        return `${year}-${month}-${day}`;
    };

    const [formValues, setFormValues] = useState({
        assignment: data?.title || '',
        subject: data?.subject_id || '',
        class: data?.class_id || '',
        teacher: data?.teacher_id || '',
        lesson: data?.lesson_id || '',
        day: data?.day || '',
        givenDate: data?.given_date ? parseDate(getFormattedDate(new Date(data?.given_date))) : null,
        submitDate: data?.submit_date ? parseDate(getFormattedDate(new Date(data?.submit_date))) : null
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
            title: formValues.assignment,
            subject_id: formValues.subject,
            class_id: formValues.class,
            teacher_id: formValues.teacher,
            lesson_id: formValues.lesson,
            given_date: event.target.givenDate.value ? new Date(event.target.givenDate.value).toISOString() : null,
            submit_date: event.target.submitDate.value ? new Date(event.target.submitDate.value).toISOString() : null
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/assignments`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/assignments/${data.id}`;

            const response = await fetch(url, {
                method,
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(`Assignment ${type === 'create' ? 'created' : 'updated'} successfully!`);
                onClose();
            } else {
                console.error(`Failed to ${type === 'create' ? 'create' : 'update'} assignment.`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="flex gap-3 flex-wrap justify-between">
                <InputField
                    type="text"
                    label="Assignment Name"
                    name='assignment'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.assignment}
                    onChange={handleChange}
                    icon={ <Assignment style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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
                    label="Teacher"
                    name='teacher'
                    className="w-[48%]"
                    datas={teachers}
                    value={formValues.teacher}
                    onChange={handleChange}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Given Date'
                    name='givenDate'
                    className="w-[48%]"
                    value={formValues.givenDate}
                    onChange={handleChange}
                />
                <DatePickerField
                    isRequired={true}
                    label='Submit Date'
                    name='submitDate'
                    className="w-[48%]"
                    value={formValues.submitDate}
                    onChange={handleChange}
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

export default AssignmentForm;