import InputField from "../formsFields/InputField";
import { Grade, Percent } from '@mui/icons-material';
import { Button } from "@nextui-org/react";

const GradeForm = ({ onClose }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            level: event.target.level.value,
            percentage: event.target.percentage.value
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/grades`, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Grade created successfully!");
                onClose();
            } else {
                console.error("Failed to create grade.");
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
                    label="Level"
                    name='level'
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

export default GradeForm;