'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Classes = () => {
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
            field: 'capacity',
            headerName: 'Capacity',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'supervisor',
            headerName: 'Supervisor',
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
                    onClick={(e) => handleConfirmDelete(e, params?.id)}
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
                <Tooltip title="Edit" onClick={(e) => handleUpdateClass(e, params)}>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
          }
    ];

    const handleUpdateClass = async (event, row) => {
        event.stopPropagation()
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteClass = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/classes/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Class deleted successfully!");
                onClose();
            } else {
                console.error("Failed to delete class.");
            }
        } catch (error) {
            console.error("Error in deleting :", error);
        }
    };

    const handleConfirmDelete = (event,id) => {
        event.stopPropagation();
        setDeleteId(id)
        setDialogType("delete");  // Open delete confirmation dialog
        onOpen();
    }

    return (
        <div className='w-[98%] mx-auto'>
            <Table
                title={'Classes'}
                columns={columns}
                rowId={'id'}
                endPoint={'/classes'}
                dataPosition={'classes'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Class'
                table="class"
                type="create"
            />

            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteClass}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Class ${data?.name}`}
                    table="class"
                    type="update"
                    data={data}
                />
            )}
        </div>
    )
}

export default Classes;