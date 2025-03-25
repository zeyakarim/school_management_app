import { AirlineSeatReclineNormal, ReduceCapacity, School } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import InputField from '../formsFields/InputField';
import SelectField from '../formsFields/SelectField';
import useFetchData from '@/utils/useFetchData';
import { Button, Spinner } from '@nextui-org/react';
import { useSnackBar } from "@/utils/snackbarContext";
import useAuth from '@/hooks/useAuth';

const ClassForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);
    const { authenticated } = useAuth();

    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);

    const [formValues, setFormValues] = useState({
        class: data?.name || '',
        capacity: data?.capacity || '',
        supervisor: data?.supervisor_id || ''
    });

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formType = type === 'create' ? 'Create' : 'Update';
        if (!authenticated) {
            setSnackBar({ display: true, message: `Please register with Codeial to ${formType} Class.`, type: "info" });
            return;
        }

        setLoading(true);

        const formData = {
            class: formValues.class,
            capacity: formValues.capacity,
            supervisor_id: formValues.supervisor
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/classes`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/classes/${data.id}`;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setLoading(false);

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);

            if (response.ok && result.success) {
                const successMessage = `Class ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} class.`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: errorMessage, type: "error"
                }));
            }
        } catch (error) {
            setLoading(false);
            setSnackBar((prevSnackBar) => ({
                ...prevSnackBar, display: true, message: "Something went wrong. Please try again.", type: "error"
            }));
            setReRender((prev) => !prev);
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-wrap justify-between">
                <InputField
                    type="text"
                    label="Class Name"
                    name='class'
                    className="w-[48%] md:w-[32%]"
                    isRequired={true}
                    value={formValues.class}
                    onChange={handleChange}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Capacity"
                    name='capacity'
                    className="w-[48%] md:w-[32%]"
                    isRequired={true}
                    value={formValues.capacity}
                    onChange={handleChange}
                    icon={ <ReduceCapacity style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Supervisor"
                    name='supervisor'
                    className="w-[48%] md:w-[32%]"
                    datas={teachers}
                    value={formValues.supervisor}
                    onChange={handleChange}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>
            <div className="mt-7 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg" disabled={loading ? true : false}>
                    {loading ? <Spinner size='sm' /> : type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default ClassForm;