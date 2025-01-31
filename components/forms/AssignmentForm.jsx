import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";
import DatePickerField from "../formsFields/DatePickerField";
import { AirlineSeatReclineNormal, Assignment, AutoStories, School } from '@mui/icons-material';
import { useCallback } from "react";
import useFetchData from "@/utils/useFetchData";

const AssignmentForm = () => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);

    return (
        <form action="" method="post">
            <div className="flex gap-3 flex-wrap justify-between">
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    className="w-[48%]"
                    datas={subjects}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="text"
                    label="Assignment Name"
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <Assignment style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    className="w-[48%]"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    className="w-[48%]"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    className="w-[48%]"
                />
            </div>
        </form>
    )
}

export default AssignmentForm;