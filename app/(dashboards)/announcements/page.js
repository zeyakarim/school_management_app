import Table from "@/components/Table/Table";

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
    // {
    //     field: 'created_at',
    //     headerName: 'Created At',
    //     headerClassName: 'super-app-theme--header',
    //     flex: 1.7
    // },
];

const Announcements = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <Table 
                title={'Announcements'}
                columns={columns}
                rowId={'id'}
                endPoint={'/annoucements'}
                dataPosition={'annoucements'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Annoucement'
                table="annoucement"
                type="create"
            />
        </div>
    )
}

export default Announcements;