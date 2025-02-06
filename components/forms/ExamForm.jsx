import { AccessTime, AirlineSeatReclineNormal, AutoStories, FactCheck, School } from '@mui/icons-material';
import { Time } from "@internationalized/date";
import SelectField from '../formsFields/SelectField';
import DatePickerField from '../formsFields/DatePickerField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';
import { Button } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';
import InputField from '../formsFields/InputField';

const ExamForm = ({ onClose }) => {
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const date = event?.target?.date?.value;
        const formattedDate = date ? new Date(date).toISOString() : null;
        
        const data = {
            title: event.target.examName.value,
            subject_id: event.target.subject.value,
            class_id: event.target.class.value,
            date: formattedDate,
            start_time: formatTime(event.target.startTime.value),
            end_time: formatTime(event.target.endTime.value)
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/exams`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Exam created successfully!");
                onClose();
            } else {
                console.error("Failed to create exam.");
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
                    className="w-[32%] mt-1"
                    isRequired={true}
                    icon={ <FactCheck style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    name='subject'
                    className="w-[32%] mt-1"
                    datas={subjects}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[32%] mt-1"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    name='date'
                    className="w-[32%] mt-1"
                />
                <TimeInputField
                    isRequired={true}
                    label="Start Time"
                    name='startTime'
                    defaultValue={new Time(9, 0)} 
                    className="w-[32%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="End Time"
                    name='endTime'
                    defaultValue={new Time(12)} 
                    className="w-[32%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default ExamForm;