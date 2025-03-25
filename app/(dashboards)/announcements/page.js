'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useSnackBar } from "@/utils/snackbarContext";
import useAuth from "@/hooks/useAuth";

const Announcements = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)
    const [reRender, setReRender] = useState(false);
    const { setSnackBar } = useSnackBar();
    const { authenticated } = useAuth();

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
        {
            field: 'update',
            headerName: 'Update',
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Tooltip title="Edit" onClick={() => handleUpdateAnnouncement(params)}>
                    <IconButton style={{ padding:'0px' }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    const handleUpdateAnnouncement = async (row) => {
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteAnnoucement = async () => {
        if (!authenticated) {
            setSnackBar({ display: true, message: "Please register with Codeial to delete Announcement.", type: "info" });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/annoucements/${deleteId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);
        
            if (response.ok && result.success) {
                const successMessage = `Annoucement deleted successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to delete annoucement.`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: errorMessage, type: "error"
                }));
            }
        } catch (error) {
            setSnackBar((prevSnackBar) => ({
                ...prevSnackBar, display: true, message: "Something went wrong. Please try again.", type: "error"
            }));
            setReRender((prev) => !prev);
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
                reRender={reRender}
                setReRender={setReRender}
                mobileResponsive={true}
            />

            {dialogType === "delete" && (
                <ConfirmDialog 
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteAnnoucement}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Announcement ${data?.title}`}
                    table="annoucement"
                    type="update"
                    data={data}
                    setReRender={setReRender}
                />
            )}
        </div>
    );
};

export default Announcements;