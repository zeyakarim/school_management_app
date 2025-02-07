import { AirlineSeatReclineNormal, AutoStories, FactCheck, Grade, Percent, Person, School, TaskAlt, Attribution } from '@mui/icons-material';
import SelectField from "../formsFields/SelectField";
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';
import { Button } from '@nextui-org/react';
import DatePickerField from '../formsFields/DatePickerField';

const AttendanceForm = ({ onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: students, loading: studentsLoading } = useFetchData("students", formatTeacherLabel);
    const { data: lessons, loading: lessonsLoading } = useFetchData("lessons", formatSubjectLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            subject_id: event.target.subject.value,
            class_id: event.target.class.value,
            student_id: event.target.student.value,
            teacher_id: event.target.teacher.value,
            lesson_id: event.target.lesson.value,
            present: event.target.present.value,
            date: event.target.date.value ? new Date(event.target.date.value).toISOString() : null
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/attendances`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Attendance created successfully!");
                onClose();
            } else {
                console.error("Failed to create attendance.");
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
                    label="Present"
                    name='present'
                    className="w-[48%]"
                    datas={[{"label": 'TRUE', "key": 'TRUE' }, { "label": 'FALSE', "key": 'FALSE' }]}
                    icon={ <Attribution style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    name='date'
                    className="w-[48%]"
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Lesson Name"
                    name='lesson'
                    className="w-[48%]"
                    datas={lessons}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    name='subject'
                    className="w-[48%]"
                    datas={subjects}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[48%]"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Student"
                    name='student'
                    className="w-[48%]"
                    datas={students}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    name='teacher'
                    className="w-[48%]"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default AttendanceForm;