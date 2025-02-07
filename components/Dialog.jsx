import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import dynamic from "next/dynamic";
import ResultForm from "./forms/ResultForm";


const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
    loading: () => <h1>Loading...</h1>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
    loading: () => <h1>Loading...</h1>,
});

const ParentForm = dynamic(() => import("./forms/ParentForm"), {
    loading: () => <h1>Loading...</h1>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
    loading: () => <h1>Loading...</h1>,
});

const ClassForm = dynamic(() => import("./forms/ClassForm"), {
    loading: () => <h1>Loading...</h1>,
});

const ExamForm = dynamic(() => import("./forms/ExamForm"), {
    loading: () => <h1>Loading...</h1>,
});

const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
    loading: () => <h1>Loading...</h1>,
});

const LessonForm = dynamic(() => import("./forms/LessonForm"), {
    loading: () => <h1>Loading...</h1>,
});

const GradeForm = dynamic(() => import("./forms/GradeForm"), {
    loading: () => <h1>Loading...</h1>,
});

const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), {
    loading: () => <h1>Loading...</h1>,
})

const forms = {
    subject: (type, data, relatedData, onClose) => (
        <SubjectForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    lesson: (type, data, relatedData, onClose) => (
        <LessonForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    attendance: (type, data, relatedData, onClose) => (
        <AttendanceForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    grade: (type, data, relatedData, onClose) => (
        <GradeForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    class: (type, data, relatedData, onClose) => (
        <ClassForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    parent: (type, data, relatedData, onClose) => (
        <ParentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
        />
    ),
    teacher: (type, data, relatedData, onClose) => (
        <TeacherForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
        />
    ),
    student: (type, data, relatedData, onClose) => (
        <StudentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
        />
    ),
    exam: (type, data, relatedData, onClose) => (
        <ExamForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
        />
    ),
    assignment: (type, data, relatedData, onClose) => (
        <AssignmentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
        />
    ),
    result: (type, data, relatedData, onClose) => (
        <ResultForm 
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
        />
    )
};
  
  
const Dialog = ({ isOpen, onOpenChange, onClose, dialogTitle, table, type }) => {
    const FormComponent = forms[table] ? forms[table](type, {}, [], onClose) : <p>No form available</p>;

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            size="2xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{dialogTitle && dialogTitle}</ModalHeader>
                    <ModalBody>{FormComponent}</ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default Dialog;