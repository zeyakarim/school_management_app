import {Button, useDisclosure} from "@nextui-org/react";
import Dialog from "./Dialog";

const AddNewUserBtn = ({ dialogTitle, table, type }) => {
    const {isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
       <div>
            <Button 
                radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={onOpen}
            >
                ADD
            </Button>

            <Dialog 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                dialogTitle={dialogTitle}
                table={table}
                type={type}
            />
       </div>
    )
}

export default AddNewUserBtn;