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

const Exams = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)
    const [reRender, setReRender] = useState(false);
    const { setSnackBar } = useSnackBar();

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
        {
            field: 'update',
            headerName: 'Update',
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Tooltip title="Edit" onClick={() => handleUpdateGrade(params)}>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    const handleUpdateGrade = async (row) => {
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteGrade = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/grades/${deleteId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            onClose();

            setReRender((prev) => !prev);
        
            if (response.ok && result.success) {
                const successMessage = `Grade deleted successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to delete grade.`;
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
                reRender={reRender}
            />

            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteGrade}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Grade ${data?.level}`}
                    table="grade"
                    type="update"
                    data={data}
                    setReRender={setReRender}
                />
            )}
        </div>
    )
}

export default Exams;