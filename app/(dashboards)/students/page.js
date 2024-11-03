import Table from "@/components/Table/Table";

const columnVisibilityModel = {
    username: false,
    blood_type: false,
    birth_date: false
}

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
];

const Students = async () => {
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
                title='All Students'
                table="student"
                type="create"
                dialogTitle='Create A New Student'
            />
        </div>
    )
};

export default Students;