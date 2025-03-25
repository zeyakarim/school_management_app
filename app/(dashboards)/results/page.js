'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useSnackBar } from "@/utils/snackbarContext";
import useAuth from "@/hooks/useAuth";

const Results = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)
    const [reRender, setReRender] = useState(false);
    const { setSnackBar } = useSnackBar();
    const { authenticated } = useAuth();

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
        {
            field: 'update',
            headerName: 'Update',
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Tooltip title="Edit" onClick={() => handleUpdateResult(params)}>
                    <IconButton style={{ padding:'0px' }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    const handleUpdateResult = async (row) => {
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }

    const handleDeleteResult = async () => {
        if (!authenticated) {
            setSnackBar({ display: true, message: "Please register with Codeial to delete Result.", type: "info" });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/results/${deleteId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);
        
            if (response.ok && result.success) {
                const successMessage = `Result deleted successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to delete result.`;
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
                reRender={reRender}
                setReRender={setReRender}
                mobileResponsive={true}
            />

            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteResult}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Result ${data?.student}`}
                    table="result"
                    type="update"
                    data={data}
                    setReRender={setReRender}
                />
            )}
        </div>
    )
}

export default Results;