import Table from "@/components/Table/Table";

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
];

const Classes = () => {
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
            />
        </div>
    )
}

export default Classes;