'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Events = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);

    const columns = [
        {
            field: 'title',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            flex: 1.4,
        },
        {
            field: 'description',
            headerName: 'Description',
            headerClassName: 'super-app-theme--header',
            flex: 2,
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
            field: 'date',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            flex: 1.7,
        },
        {
            field: 'class',
            headerName: 'Class',
            headerClassName: 'super-app-theme--header',
            flex: 0.7,
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

    const handleDeleteEvent = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/events/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Event deleted successfully!");
                onClose();
            } else {
                console.error("Failed to create event.");
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
                title={'Events'}
                columns={columns}
                rowId={'id'}
                endPoint={'/events'}
                dataPosition={'events'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Event'
                table="event"
                type="create"
            />

            <ConfirmDialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteEvent}
            />
        </div>
    )
}

export default Events;