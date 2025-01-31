import { AirlineSeatReclineNormal, ReduceCapacity, School } from '@mui/icons-material';
import { useCallback } from 'react';
import InputField from '../formsFields/InputField';
import SelectField from '../formsFields/SelectField';
import useFetchData from '@/utils/useFetchData';

const ClassForm = () => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);

    return (
        <form action="" method="post">
            <div className="flex gap-2 flex-wrap justify-between">
                <InputField
                    type="text"
                    label="Class Name"
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Capacity"
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <ReduceCapacity style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Supervisor"
                    className="w-[32%]"
                    datas={teachers}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>
        </form>
    )
}

export default ClassForm;