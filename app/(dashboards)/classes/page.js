'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Classes = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

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
                    onClick={() => handleConfirmDelete(params?.id)}
                    style={{ padding:'0px' }}
                    color="error"
                >
                    <Delete />
                </IconButton>
            ),
        },
    ];

    const handleDeleteClass = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/classes/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Class deleted successfully!");
                onClose();
            } else {
                console.error("Failed to create class.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleConfirmDelete = (id) => {
        setDeleteId(id)
        onOpen()
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

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteClass}
            />
        </div>
    )
}

export default Classes;