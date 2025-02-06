import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";
import DatePickerField from "../formsFields/DatePickerField";
import { AirlineSeatReclineNormal, Assignment, AutoStories, School } from '@mui/icons-material';
import { useCallback } from "react";
import useFetchData from "@/utils/useFetchData";
import { Button } from "@nextui-org/react";

const AssignmentForm = ({ onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: lessons, loading: lessonsLoading } = useFetchData("lessons", formatSubjectLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            title: event.target.assignment.value,
            subject_id: event.target.subject.value,
            class_id: event.target.class.value,
            teacher_id: event.target.teacher.value,
            lesson_id: event.target.lesson.value,
            given_date: event.target.givenDate.value ? new Date(event.target.givenDate.value).toISOString() : null,
            submit_date: event.target.submitDate.value ? new Date(event.target.submitDate.value).toISOString() : null
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/assignments`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Assignment created successfully!");
                onClose();
            } else {
                console.error("Failed to create assignment.");
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
                    icon={ <Assignment style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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
                    label="Lesson Name"
                    name='lesson'
                    className="w-[48%]"
                    datas={lessons}
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
                    label="Teacher"
                    name='teacher'
                    className="w-[48%]"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Given Date'
                    name='givenDate'
                    className="w-[48%]"
                />
                <DatePickerField
                    isRequired={true}
                    label='Submit Date'
                    name='submitDate'
                    className="w-[48%]"
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

export default AssignmentForm;