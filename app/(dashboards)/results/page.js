'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Results = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        {
            field: 'student',
            headerName: 'Student Name',
            headerClassName: 'super-app-theme--header',
            flex: 1.7,
        },
        {
            field: 'exam',
            headerName: 'Exam',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'grade',
            headerName: 'Grade',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        // {
        //     field: 'assignment',
        //     headerName: 'Assignment',
        //     headerClassName: 'super-app-theme--header',
        //     flex: 1,
        // },
        {
            field: 'subject',
            headerName: 'Subject',
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
            field: 'percentage',
            headerName: 'Percentage',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'marks',
            headerName: 'Marks',
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: 'total',
            headerName: 'Total',
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            headerClassName: 'super-app-theme--header',
            flex: 1.7
        },
        {
            field: 'teacher',
            headerName: 'Teacher',
            headerClassName: 'super-app-theme--header',
            flex: 1
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

    const handleDeleteResult = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/results/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Result deleted successfully!");
                onClose();
            } else {
                console.error("Failed to result event.");
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
                title={'Results'}
                columns={columns}
                rowId={'id'}
                endPoint={'/results'}
                dataPosition={'results'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create Student Result'
                table="result"
                type="create"
            />

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteResult}
            />
        </div>
    )
}

export default Results;