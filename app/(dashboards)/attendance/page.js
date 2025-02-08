'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Attendance = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        {
            field: 'student',
            headerName: 'Student Name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'date',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'lesson',
            headerName: 'Lesson',
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: 'class',
            headerName: 'Class',
            headerClassName: 'super-app-theme--header',
            flex: 1,
        },
        {
            field: 'present',
            headerName: 'Attendance',
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

    const handleDeleteAttendance = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/attendances/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Attendance deleted successfully!");
                onClose();
            } else {
                console.error("Failed to create attendance.");
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
                title={'Attendance'}
                columns={columns}
                rowId={'id'}
                endPoint={'/attendances'}
                dataPosition={'attendances'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Attendance'
                table="attendance"
                type="create"
            />

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteAttendance}
            />
        </div>
    )
}

export default Attendance;