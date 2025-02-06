import { AccessTime, AirlineSeatReclineNormal, AutoStories, EightMp, Event, School } from '@mui/icons-material';
import { Time } from "@internationalized/date";
import SelectField from '../formsFields/SelectField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';
import InputField from '../formsFields/InputField';
import { Button } from '@nextui-org/react';
import { formatTime } from '@/utils/helper';

const days = [
    { "label": 'MONDAY',    "key": 'MONDAY' },
    { "label": 'TUESDAY',   "key": 'TUESDAY' },
    { "label": 'WEDNESDAY', "key": 'WEDNESDAY' },
    { "label": 'THURSDAY',  "key": 'THURSDAY' },
    { "label": 'FRIDAY',    "key": 'FRIDAY' },
    { "label": 'SATURDAY',  "key": 'SATURDAY' }
]

const LessonForm = ({ onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            lesson: event.target.lesson.value,
            subject_id: event.target.subject.value,
            class_id: event.target.class.value,
            teacher_id: event.target.teacher.value,
            start_time: formatTime(event.target.startTime.value),
            end_time: formatTime(event.target.endTime.value),
            day: event.target.day.value
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/lessons`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Lesson created successfully!");
                onClose();
            } else {
                console.error("Failed to create lesson.");
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
                    label="Lesson"
                    name='lesson'
                    className="w-[32%] mt-1"
                    isRequired={true}
                    icon={ <EightMp style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    name='teacher'
                    className="w-[32%] mt-1"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Day"
                    name='day'
                    className="w-[32%] mt-1"
                    datas={days}
                    icon={ <Event style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default LessonForm;