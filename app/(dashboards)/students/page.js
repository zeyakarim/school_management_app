'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import Table from "@/components/Table/Table";
import { Delete, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useSnackBar } from "@/utils/snackbarContext";
import { useRouter } from "next/navigation";

const columnVisibilityModel = {
    username: false,
    blood_type: false,
    birth_date: false
}

const Students = () => {
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState({})
    const [dialogType, setDialogType] = useState(null)
    const [reRender, setReRender] = useState(false);
    const { setSnackBar } = useSnackBar();
    const router = useRouter();

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
            field: 'blood_type',
            headerName: 'Blood Type',
            headerClassName: 'super-app-theme--header',
            flex: 0.8,
        },
        {
            field: 'birth_date',
            headerName: 'D.O.B',
            headerClassName: 'super-app-theme--header',
            flex: 1.7
        },
        {
            field: 'gender',
            headerName: 'Gender',
            headerClassName: 'super-app-theme--header',
            flex: 0.8
        },
        {
            field: 'class',
            headerName: 'Class',
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: 'parent',
            headerName: 'Parent',
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
                <Tooltip title="Edit" onClick={(e) => handleUpdateStudent(e, params)}>
                    <IconButton style={{ padding:'0px' }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            )
        },
        {
            field: 'View',
            headerName: 'View',
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Tooltip title="Open Details">
                    <IconButton
                    style={{ padding: "0px" }}
                    onClick={() => router.push(`/students/${params?.id}`)}
                    >
                    <Visibility />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    const handleUpdateStudent = async (event, row) => {
        event.stopPropagation()
        setData(row);
        setDialogType("update");  // Open update dialog
        onOpen();
    }
    

    const handleDeleteStudent = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/students/${deleteId}`, {
                method: "DELETE"
            });

            const result = await response.json();
            onClose();
            setReRender((prev) => !prev);
        
            if (response.ok && result.success) {
                const successMessage = `Student deleted successfully!`;
                setSnackBar((prevSnackBar) => ({
                    ...prevSnackBar, display: true, message: successMessage, type: "success"
                }));
            } else {
                const errorMessage = result?.message || `Failed to delete student.`;
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

    const handleConfirmDelete = (event, id) => {
        event.stopPropagation()
        setDeleteId(id)
        setDialogType("delete");  // Open delete confirmation dialog
        onOpen();
    }

    return (
        <div className='w-[98%] mx-auto'>
            <Table
                columns={columns}
                rowId={'id'}
                endPoint={'/students'}
                dataPosition={'students'}
                checkBoxSelection={false}
                columnVisibilityModel={columnVisibilityModel}
                version='version-1'
                title='Students'
                table="student"
                type="create"
                dialogTitle='Create A New Student'
                data={data}
                reRender={reRender}
                setReRender={setReRender}
                mobileResponsive={true}
            />

            {dialogType === "delete" && (
                <ConfirmDialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSubmit={handleDeleteStudent}
                />
            )}

            {dialogType === "update" && (
                <Dialog
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                    dialogTitle={`Update Student ${data?.first_name}`}
                    table="student"
                    type="update"
                    data={data}
                    setReRender={setReRender}
                />
            )}
        </div>
    )
};

export default Students;