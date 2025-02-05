import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";
import { AirlineSeatReclineNormal, AutoStories, School } from '@mui/icons-material';
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';
import { Button } from "@nextui-org/react";

const SubjectForm = ({ onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatClassLabel = useCallback((item) => item?.name, []);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatClassLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            subject: event.target.subject.value,
            class_id: event.target.class.value,
            teacher_id: event.target.teacher.value
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/subjects`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Subject created successfully!");
                // onClose();
            } else {
                console.error("Failed to create subject.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-wrap justify-between">
                <InputField
                    type="text"
                    label="Subject"
                    name='subject'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[32%]"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    name='teacher'
                    className="w-[32%]"
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

export default SubjectForm;