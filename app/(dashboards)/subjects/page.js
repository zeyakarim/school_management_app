'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Subjects = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'class',
            headerName: 'Class',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'teacher',
            headerName: 'Teacher',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            headerClassName: 'super-app-theme--header',
            flex: 1.7
        },
        {
            field: 'delete',
            headerName: 'Delete',
            headerClassName: 'super-app-theme--header',
            flex: 0.7,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleConfirmDelete(params?.id)}
                    style={{ padding:'0px' }}
                    color="error"
                >
                    <Delete />
                </IconButton>
            ),
        },
        // {
        //     field: 'update',
        //     headerName: 'Update',
        //     flex: 0.5,
        //     sortable: false,
        //     filterable: false,
        //     renderCell: (params) => (
        //         <Tooltip title="Edit" onClick={(e) => handleUpdateSubject(e, params)}>
        //             <IconButton>
        //                 <EditIcon />
        //             </IconButton>
        //         </Tooltip>
        //     )
        // }
    ];

    const handleDeleteSubject = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/subjects/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Subject deleted successfully!");
                onClose();
            } else {
                console.error("Failed to subject event.");
            }
        } catch (error) {
            console.error("Error in deleting :", error);
        }
    };

    const handleConfirmDelete = (id) => {
        setDeleteId(id)
        onOpen()
    }

    return (
        <div className='w-[98%] mx-auto'>
            <Table
                columns={columns}
                rowId={'id'}
                endPoint={'/subjects'}
                dataPosition={'subjects'}
                checkBoxSelection={false}
                version='version-1'
                title={'Subjects'}
                dialogTitle='Create A New Subject'
                table="subject"
                type="create"
            />

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteSubject}
            />
        </div>
    )
}

export default Subjects;