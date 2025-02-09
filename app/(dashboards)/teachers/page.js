'use client'; // Ensure this is treated as a Client Component

import ConfirmDialog from "@/components/ConfirmDialog";
import Dialog from "@/components/Dialog";
import EditIcon from "@/components/EditIcon";
import Table from "@/components/Table/Table";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Teachers = () => {
  const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState({})
  const [dialogType, setDialogType] = useState(null)

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
      field: 'created_at',
      headerName: 'Created AT',
      headerClassName: 'super-app-theme--header',
      flex: 1.7
    },
    {
      field: 'delete',
      headerName: 'Delete',
      headerClassName: 'super-app-theme--header',
      flex: 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => handleConfirmDelete(e,params?.id)}
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
        <Tooltip title="Edit" onClick={(e) => handleUpdateTeacher(e, params)}>
          <IconButton>
            <EditIcon />
          </IconButton>
      </Tooltip>
      )
    }
  ];

  const handleUpdateTeacher = async (event, row) => {
    event.stopPropagation()
    setData(row);
    setDialogType("update");  // Open update dialog
    onOpen();
  }

  const handleDeleteTeacher = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/teachers/${deleteId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("Teacher deleted successfully!");
        onClose();
      } else {
        console.error("Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Error in deleting :", error);
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
        columns={columns}
        rowId={'id'}
        endPoint={'/teachers'}
        dataPosition={'teachers'}
        checkBoxSelection={false}
        navigateOnRowClickEndpoint={`/teachers`}
        version='version-1'
        title='Teachers'
        dialogTitle='Create A New Teacher'
        table="teacher"
        type="create"
        data={data}
      />

      {dialogType === "delete" && (
        <ConfirmDialog
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleSubmit={handleDeleteTeacher}
        />
      )}

      {dialogType === "update" && (
        <Dialog
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          dialogTitle={`Update Teacher ${data?.first_name}`}
          table="teacher"
          type="update"
          data={data}
        />
      )}
    </div>
  )
}

export default Teachers;