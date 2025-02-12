'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Lessons = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)

    const columns = [
        {
            field: 'name',
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
            field: 'start_time',
            headerName: 'Start Time',
            headerClassName: 'super-app-theme--header',
            flex: 1.7,
        },
        {
            field: 'end_time',
            headerName: 'End Time',
            headerClassName: 'super-app-theme--header',
            flex: 1.7
        },
        {
            field: 'day',
            headerName: 'Day',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'teacher',
            headerName: 'Teacher',
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: 'class',
            headerName: 'Class',
            headerClassName: 'super-app-theme--header',
            flex: 0.7,
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
                <Tooltip title="Edit" onClick={() => handleUpdateLesson(params)}>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    const handleUpdateLesson = async (row) => {
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteLesson = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/lessons/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Lesson deleted successfully!");
                onClose();
            } else {
                console.error("Failed to delete lesson.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleConfirmDelete = (id) => {
        setDeleteId(id)
        setDialogType("delete");  // Open delete confirmation dialog
        onOpen()
    }

    return (
        <div className='w-[98%] mx-auto'>
            <Table 
                title={'Lessons'}
                columns={columns}
                rowId={'id'}
                endPoint={'/lessons'}
                dataPosition={'lessons'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Lesson'
                table="lesson"
                type="create"
            />

            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteLesson}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Lesson ${data?.name}`}
                    table="lesson"
                    type="update"
                    data={data}
                />
            )}
        </div>
    )
}

export default Lessons;