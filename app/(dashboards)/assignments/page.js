'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Assignments = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)

    const columns = [
        {
            field: 'title',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            flex: 1.7,
        },
        {
            field: 'subject',
            headerName: 'Subject',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'lesson',
            headerName: 'Lesson',
            headerClassName: 'super-app-theme--header',
            flex: 1.7,
        },
        {
            field: 'teacher',
            headerName: 'Teacher',
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
            field: 'submit_date',
            headerName: 'Submit Date',
            headerClassName: 'super-app-theme--header',
            flex: 1.7,
        },
        {
            field: 'given_date',
            headerName: 'Given Date',
            headerClassName: 'super-app-theme--header',
            flex: 1.7
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
        {
            field: 'update',
            headerName: 'Update',
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Tooltip title="Edit" onClick={() => handleUpdateAssignment(params)}>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    const handleUpdateAssignment = async (row) => {
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteAssignment = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/assignments/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Assignment deleted successfully!");
                onClose();
            } else {
                console.error("Failed to delete assignment.");
            }
        } catch (error) {
            console.error("Error in deleting :", error);
        }
    };

    const handleConfirmDelete = (id) => {
        setDeleteId(id)
        setDialogType("delete");
        onOpen()
    }

    return (
        <div className='w-[98%] mx-auto'>
            <Table
                title={'Assignments'}
                columns={columns}
                rowId={'id'}
                endPoint={'/assignments'}
                dataPosition={'assignments'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Assignment'
                table="assignment"
                type="create"
            />

            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteAssignment}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Assignment ${data?.title}`}
                    table="assignment"
                    type="update"
                    data={data}
                />
            )}
        </div>
    )
}

export default Assignments;