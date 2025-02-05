import { AirlineSeatReclineNormal, ReduceCapacity, School } from '@mui/icons-material';
import { useCallback } from 'react';
import InputField from '../formsFields/InputField';
import SelectField from '../formsFields/SelectField';
import useFetchData from '@/utils/useFetchData';
import { Button } from '@nextui-org/react';

const ClassForm = ({ onClose }) => {
    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            class: event.target.class.value,
            capacity: event.target.capacity.value,
            supervisor_id: event.target.supervisor.value
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/classes`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Class created successfully!");
                onClose();
            } else {
                console.error("Failed to create class.");
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
                    label="Class Name"
                    name='class'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Capacity"
                    name='capacity'
                    className="w-[32%]"
                    isRequired={true}
                    icon={ <ReduceCapacity style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Supervisor"
                    name='supervisor'
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

export default ClassForm;