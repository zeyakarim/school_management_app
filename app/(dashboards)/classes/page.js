'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Table from "@/components/Table/Table";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useSnackBar } from "@/utils/snackbarContext";
import useAuth from "@/hooks/useAuth";

const Classes = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)
    const [reRender, setReRender] = useState(false);
    const { setSnackBar } = useSnackBar();
    const { authenticated } = useAuth();

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
                    <IconButton style={{ padding:'0px' }}>
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
        if (!authenticated) {
            setSnackBar({ display: true, message: "Please register with Codeial to delete Class.", type: "info" });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/classes/${deleteId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);

            if (response.ok && result.success) {
                const successMessage = `Class deleted successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to delete class.`;
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
                reRender={reRender}
                setReRender={setReRender}
                mobileResponsive={true}
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
                    setReRender={setReRender}
                />
            )}
        </div>
    )
}

export default Classes;