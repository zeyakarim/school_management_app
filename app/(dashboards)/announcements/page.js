'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";

const Announcements = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null)

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

    const handleDeleteAnnoucement = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/annoucements/${deleteId}`, {
                method: "DELETE"
            });
    
            if (response.ok) {
                console.log("Annoucement deleted successfully!");
                onClose();
            } else {
                console.error("Failed to create annoucement.");
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
                title='Announcements'
                columns={columns}
                rowId='id'
                endPoint='/annoucements'
                dataPosition='annoucements'
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Announcement'
                table='annoucement'
                type='create'
            />

            <ConfirmDialog 
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSubmit={handleDeleteAnnoucement}
            />
        </div>
    );
};

export default Announcements;