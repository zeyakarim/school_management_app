import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ConfirmDialog = ({ isOpen, onOpenChange, handleSubmit }) => {

    return (
        <div className="flex px-10 min-h-[80vh] justify-center items-center flex-col gap-4">
            <Modal isOpen={isOpen} placement={'center'} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this record?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={handleSubmit}>
                            Delete
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ConfirmDialog;