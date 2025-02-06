import { AirlineSeatReclineNormal, AutoStories, FactCheck, Grade, Percent, Person, School, TaskAlt } from '@mui/icons-material';
import SelectField from "../formsFields/SelectField";
import InputField from "../formsFields/InputField";
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';
import { Button } from '@nextui-org/react';

const ResultForm = ({ onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: students, loading: studentsLoading } = useFetchData("students", formatTeacherLabel);

    return (
        <form method="post">
            <div className="flex gap-3 flex-wrap justify-between">
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
                <InputField
                    type="text"
                    label="Grade"
                    name='grade'
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <Grade style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Percentage"
                    name='percentage'
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <Percent style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Mark"
                    name='mark'
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <FactCheck style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Total"
                    name='total'
                    className="w-[48%]"
                    isRequired={true}
                    icon={ <TaskAlt style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default ResultForm;