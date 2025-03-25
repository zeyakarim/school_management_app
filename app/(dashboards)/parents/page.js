'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import Table from "@/components/Table/Table";
import useAuth from "@/hooks/useAuth";
import { useSnackBar } from "@/utils/snackbarContext";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Parents = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)
    const [reRender, setReRender] = useState(false);
    const { setSnackBar } = useSnackBar();
    const { authenticated } = useAuth();

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
                <Tooltip title="Edit" onClick={(e) => handleUpdateParent(e, params)}>
                    <IconButton style={{ padding:'0px' }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
          }
    ];

    const handleUpdateParent = async (event, row) => {
        event.stopPropagation()
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteParent = async () => {
        if (!authenticated) {
            setSnackBar({ display: true, message: "Please register with Codeial to delete Parent.", type: "info" });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/parents/${deleteId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);

            if (response.ok && result.success) {
                const successMessage = `Parent deleted successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to delete parent.`;
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
                reRender={reRender}
                setReRender={setReRender}
                mobileResponsive={true}
            />
        
            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteParent}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Parent ${data?.first_name}`}
                    table="parent"
                    type="update"
                    data={data}
                    setReRender={setReRender}
                />
            )}
        </div>
    )
};

export default Parents;