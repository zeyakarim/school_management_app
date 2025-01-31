import { AccessTime, AirlineSeatReclineNormal, AutoStories, School } from '@mui/icons-material';
import { Time } from "@internationalized/date";
import SelectField from '../formsFields/SelectField';
import DatePickerField from '../formsFields/DatePickerField';
import TimeInputField from '../formsFields/TimeInputField';
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';

const ExamForm = () => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);

    return (
        <form action="" method="post">
            <div className="flex gap-3 flex-wrap justify-between">
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    className="w-[32%] mt-1"
                    datas={subjects}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    className="w-[32%] mt-1"
                    datas={classes}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    className="w-[32%] mt-1"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <DatePickerField
                    isRequired={true}
                    label='Date'
                    className="w-[32%] mt-1"
                />
                <TimeInputField
                    isRequired={true}
                    label="Start Time" 
                    defaultValue={new Time(9, 0)} 
                    className="w-[32%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <TimeInputField
                    isRequired={true}
                    label="End Time" 
                    defaultValue={new Time(12)} 
                    className="w-[32%] mt-1"
                    icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>
        </form>
    )
}

export default ExamForm;