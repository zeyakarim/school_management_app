import { AccessTime, AirlineSeatReclineNormal, AutoStories, FactCheck, School } from '@mui/icons-material';
import SelectField from '../formsFields/SelectField';
import DatePickerField from '../formsFields/DatePickerField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';
import InputField from '../formsFields/InputField';
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";

const ExamForm = ({ type, data, onClose }) => {
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);

    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month
        const day = String(date.getDate()).padStart(2, '0');       // Add leading zero to day
        
        return `${year}-${month}-${day}`;
    };

    const [formValues, setFormValues] = useState({
        examName: data?.title || '',
        subject: data?.subject_id || '',
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

        const date = event?.target?.date?.value;
        const formattedDate = date ? new Date(date).toISOString() : null;
        
        const formData = {
            title: formValues.examName,
            subject_id: formValues.subject,
            class_id: formValues.class,
            date: formattedDate,
            start_time: formatTime(event.target.startTime.value),
            end_time: formatTime(event.target.endTime.value)
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/exams`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/exams/${data.id}`;

            const response = await fetch(url, {
                method,
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(`Exam ${type === 'create' ? 'created' : 'updated'} successfully!`);
                onClose();
            } else {
                console.error(`Failed to ${type === 'create' ? 'create' : 'update'} exam.`);
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
                    label="Exam Name"
                    name='examName'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.examName}
                    onChange={handleChange}
                    icon={ <FactCheck style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    name='date'
                    value={formValues.date}
                    onChange={handleChange}
                    className="w-[48%]"
                />
                <TimeInputField
                    isRequired={true}
                    label="Start Time"
                    name='startTime'
                    value={formValues.startTime}
                    onChange={handleChange}
                    className="w-[48%]"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="End Time"
                    name='endTime'
                    value={formValues.endTime}
                    onChange={handleChange}
                    className="w-[48%]"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default ExamForm;