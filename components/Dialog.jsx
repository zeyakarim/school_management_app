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
});

const EventForm = dynamic(() => import("./forms/EventForm"), {
    loading: () => <h1>Loading...</h1>,
});

const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), {
    loading: () => <h1>Loading...</h1>,
});


const forms = {
    subject: (type, data, relatedData, onClose, setReRender) => (
        <SubjectForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    lesson: (type, data, relatedData, onClose, setReRender) => (
        <LessonForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    event: (type, data, relatedData, onClose, setReRender) => (
        <EventForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    annoucement: (type, data, relatedData, onClose, setReRender) => (
        <AnnouncementForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    attendance: (type, data, relatedData, onClose, setReRender) => (
        <AttendanceForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    grade: (type, data, relatedData, onClose, setReRender) => (
        <GradeForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    class: (type, data, relatedData, onClose, setReRender) => (
        <ClassForm
            type={type}
            data={data}
            onClose={onClose}
            // setOpen={setOpen}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    parent: (type, data, relatedData, onClose, setReRender) => (
        <ParentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    teacher: (type, data, relatedData, onClose, setReRender) => (
        <TeacherForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    student: (type, data, relatedData, onClose, setReRender) => (
        <StudentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    exam: (type, data, relatedData, onClose, setReRender) => (
        <ExamForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    assignment: (type, data, relatedData, onClose, setReRender) => (
        <AssignmentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    ),
    result: (type, data, relatedData, onClose, setReRender) => (
        <ResultForm 
            type={type}
            data={data}
            // setOpen={setOpen}
            onClose={onClose}
            relatedData={relatedData}
            setReRender={setReRender}
        />
    )
};
  
  
const Dialog = ({ isOpen, onOpenChange, onClose, dialogTitle, table, type, data, setReRender }) => {
    const FormComponent = forms[table] ? forms[table](type, data, [], onClose, setReRender) : <p>No form available</p>;

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