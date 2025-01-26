import Table from "@/components/Table/Table";

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
];

const Parents = () => {
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
            />
        </div>
    )
};

export default Parents;