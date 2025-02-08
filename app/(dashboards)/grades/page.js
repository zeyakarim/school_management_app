'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Exams = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        {
            field: 'level',
            headerName: 'Level',
            headerClassName: 'super-app-theme--header',
            flex: 2,
        },
        {
            field: 'percentage',
            headerName: 'Percentage',
            headerClassName: 'super-app-theme--header',
            flex: 2,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            headerClassName: 'super-app-theme--header',
            flex: 2
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

    const handleDeleteGrade = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/grades/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Grade deleted successfully!");
                onClose();
            } else {
                console.error("Failed to create grade.");
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
                title={'Grades'}
                columns={columns}
                rowId={'id'}
                endPoint={'/grades'}
                dataPosition={'grades'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Grade'
                table="grade"
                type="create"
            />

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteGrade}
            />
        </div>
    )
}

export default Exams;