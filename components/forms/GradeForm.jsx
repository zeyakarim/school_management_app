import { useSnackBar } from "@/utils/snackbarContext";
import InputField from "../formsFields/InputField";
import { Grade, Percent } from '@mui/icons-material';
import { Button } from "@nextui-org/react";
import { useState } from "react";

const GradeForm = ({ type, data, onClose }) => {
    const { setSnackBar } = useSnackBar();

    const [formValues, setFormValues] = useState({
        level: data?.level || '',
        percentage: data?.percentage || ''
    });

    const handleChange = (name, value) => {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            level: formValues?.level,
            percentage: formValues?.percentage
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/grades`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/grades/${data.id}`;

            const response = await fetch(url, {
                method,
                body: JSON.stringify(formData),
            });
            console.log(response,'reponse')
            onClose();
            if (response.ok) {
                const successMessage = `Grade ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => {
                    return { ...prevSnackBar, display: true, message: successMessage, type: "success" }
                });
            } else {
                const errorMessage = response?.error?.message || `Failed to ${type === 'create' ? 'create' : 'update'} grade.`
                setSnackBar((prevSnackBar) => {
                    return { ...prevSnackBar, display: true, message: errorMessage, type: "error" }
                });
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message
            setSnackBar((prevSnackBar) => {
                return { ...prevSnackBar, display: true, message: errorMessage, type: "error" }
            });
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-wrap justify-between">
                <InputField
                    type="text"
                    label="Level"
                    name='level'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.level}
                    onChange={handleChange}
                    icon={ <Grade style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Percentage"
                    name='percentage'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.percentage}
                    onChange={handleChange}
                    icon={ <Percent style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
            </div>

            <div className="mt-7 flex justify-end gap-2 mb-2">
                <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                    Close
                </Button>
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                    {type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default GradeForm;