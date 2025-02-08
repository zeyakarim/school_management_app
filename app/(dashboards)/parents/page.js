'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Parents = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        {
            field: 'username',
            headerName: 'Username',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'first_name',
            headerName: 'First name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            headerClassName: 'super-app-theme--header',
            flex: 1.4
        },
        {
            field: 'phone',
            headerName: 'Phone',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'address',
            headerName: 'Address',
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

    const handleDeleteParent = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/parents/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Parent deleted successfully!");
                onClose();
            } else {
                console.error("Failed to delete parent.");
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
                endPoint={'/parents'}
                dataPosition={'parents'}
                checkBoxSelection={false}
                version='version-1'
                title='Parents'
                dialogTitle='Create A New Parent'
                table="parent"
                type="create"
            />

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteParent}
            />
        </div>
    )
};

export default Parents;