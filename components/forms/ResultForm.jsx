import { AirlineSeatReclineNormal, AutoStories, FactCheck, Grade, Percent, Person, School, TaskAlt } from '@mui/icons-material';
import SelectField from "../formsFields/SelectField";
import InputField from "../formsFields/InputField";
import useFetchData from '@/utils/useFetchData';
import { useCallback, useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { useSnackBar } from '@/utils/snackbarContext';
import useAuth from '@/hooks/useAuth';

const ResultForm = ({ type, data, onClose, setReRender }) => {
    const { setSnackBar } = useSnackBar();
    const [loading, setLoading] = useState(false);
    const { authenticated } = useAuth();

    const formatTeacherLabel = useCallback(
        (item) => (item?.last_name ? `${item?.first_name} ${item?.last_name}` : item?.first_name), []
    );
    const formatSubjectLabel = useCallback((item) => item?.name, []);
    const formatGradeLabel = useCallback((item) => item?.level, []);
    const formatExamLabel = useCallback((item) => item?.title, []);

    const { data: subjects, loading: subjectsLoading } = useFetchData("subjects", formatSubjectLabel);
    const { data: classes, loading: classesLoading } = useFetchData("classes", formatSubjectLabel);
    const { data: teachers, loading: teachersLoading } = useFetchData("teachers", formatTeacherLabel);
    const { data: students, loading: studentsLoading } = useFetchData("students", formatTeacherLabel);
    const { data: grades, loading: gradesLoading } = useFetchData("grades", formatGradeLabel);
    const { data: exams, loadint: examsLoading } = useFetchData("exams", formatExamLabel);

    const [formValues, setFormValues] = useState({
        subject: data?.subject_id || '',
        class: data?.class_id || '',
        student: data?.student_id || '',
        teacher: data?.teacher_id || '',
        grade: data?.grade_id || '',
        exam: data?.exam_id || '',
        percentage: data?.percentage || '',
        mark: data?.marks || '',
        total: data?.total || ''
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
            setSnackBar({ display: true, message: `Please register with Codeial to ${formType} Result.`, type: "info" });
            return;
        }

        setLoading(true);

        const formData = {
            subject_id: formValues?.subject,
            class_id: formValues?.class,
            student_id: formValues?.student,
            teacher_id: formValues?.teacher,
            grade_id: formValues?.grade,
            exam_id: formValues?.exam,
            percentage: formValues?.percentage,
            marks: formValues?.mark,
            total: formValues?.total
        }

        try {
            const method = type === 'create' ? 'POST' : 'PUT';
            const url = type === 'create'
                ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/results`
                : `${process.env.NEXT_PUBLIC_WEBSITE_URL}/results/${data.id}`;

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
                const successMessage = `Result ${type === 'create' ? 'created' : 'updated'} successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to ${type === 'create' ? 'create' : 'update'} result.`;
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
            <div className="flex gap-3 flex-wrap justify-between">
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Subject Name"
                    name='subject'
                    className="w-[48%]"
                    datas={subjects}
                    value={formValues.subject}
                    onChange={handleChange}
                    icon={ <AutoStories style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Class Name"
                    name='class'
                    className="w-[48%]"
                    datas={classes}
                    value={formValues.class}
                    onChange={handleChange}
                    icon={ <AirlineSeatReclineNormal style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Student"
                    name='student'
                    className="w-[48%]"
                    datas={students}
                    value={formValues.student}
                    onChange={handleChange}
                    icon={ <Person style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Teacher"
                    name='teacher'
                    className="w-[48%]"
                    datas={teachers}
                    value={formValues.teacher}
                    onChange={handleChange}
                    icon={ <School style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Grade"
                    name='grade'
                    className="w-[48%]"
                    datas={grades}
                    value={formValues.grade}
                    onChange={handleChange}
                    icon={ <Grade style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <SelectField
                    isRequired={true}
                    selectionMode="single"
                    label="Exam"
                    name='exam'
                    className="w-[48%]"
                    datas={exams}
                    value={formValues.exam}
                    onChange={handleChange}
                    icon={ <FactCheck style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Mark"
                    name='mark'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.mark}
                    onChange={handleChange}
                    icon={ <FactCheck style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
                />
                <InputField
                    type="number"
                    label="Total"
                    name='total'
                    className="w-[48%]"
                    isRequired={true}
                    value={formValues.total}
                    onChange={handleChange}
                    icon={ <TaskAlt style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" /> }
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

export default ResultForm;