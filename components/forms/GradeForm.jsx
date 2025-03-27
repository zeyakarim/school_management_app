import { useSnackBar } from "@/utils/snackbarContext";
import InputField from "../formsFields/InputField";
import { Grade, Percent } from '@mui/icons-material';
import { Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useSession } from "next-auth/react";

const GradeForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);
    const { authenticated } = useAuth();
    const { data: session } = useSession();

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

        const formType = type === 'create' ? 'Create' : 'Update';
        if (!(session || authenticated)) {
            setSnackBar({ display: true, message: `Please register with Codeial to ${formType} Grade.`, type: "info" });
            return;
        }

        setLoading(true);

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setLoading(false);
        
            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);
        
            if (response.ok && result.success) {
                const successMessage = `Grade ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} grade.`;
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
                <Button type="submit" radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg" disabled={loading ? true : false}>
                    {loading ? <Spinner size='sm' /> : type === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>
        </form>
    )
}

export default GradeForm;