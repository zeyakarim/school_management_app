import InputField from "../formsFields/InputField";
import SelectField from "../formsFields/SelectField";
import { AutoStories, School } from '@mui/icons-material';
import useFetchData from '@/utils/useFetchData';
import { useCallback } from 'react';

const SubjectForm = () => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);

    return (
        <form action="" method="post">
            <div className="flex gap-2 flex-wrap justify-between">
                <InputField
                    type="text"
                    label="Subject"
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="multiple"
                    label="Teacher"
                    className="w-[66%]"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>
        </form>
    )
}

export default SubjectForm;