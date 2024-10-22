import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
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

const forms = {
    subject: (type, data, relatedData) => (
        <SubjectForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    class: (type, data, relatedData) => (
        <ClassForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    parent: (type, data, relatedData) => (
        <ParentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    teacher: (type, data, relatedData) => (
        <TeacherForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    student: (type, data, relatedData) => (
        <StudentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    exam: (type, data, relatedData) => (
        <ExamForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    assignment: (type, data, relatedData) => (
        <AssignmentForm
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    ),
    result: (type, data, relatedData) => (
        <ResultForm 
            type={type}
            data={data}
            // setOpen={setOpen}
            relatedData={relatedData}
        />
    )
};
  
  
const Dialog = ({ isOpen, onOpenChange, dialogTitle, table, type }) => {
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
                <ModalBody>
                    {/* <TeacherForm /> */}
                    {forms[table](type, {}, [])}
                </ModalBody>
                <ModalFooter className="mt-4">
                    <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#C6884C] to-yellow-500 text-white shadow-lg">
                        Close
                    </Button>
                    <Button onPress={onClose} radius="full" className="bg-gradient-to-tr from-[#4CC67C] to-[#46DCDF] text-white shadow-lg">
                        Create
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
};

export default Dialog;