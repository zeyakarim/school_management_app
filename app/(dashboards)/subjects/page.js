import Table from "@/components/Table/Table";

const columns = [
    {
        field: 'name',
        headerName: 'Name',
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
        field: 'teacher',
        headerName: 'Teacher',
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

const Subjects = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <Table
                columns={columns}
                rowId={'id'}
                endPoint={'/subjects'}
                dataPosition={'subjects'}
                checkBoxSelection={false}
                version='version-1'
                title={'Subjects'}
                dialogTitle='Create A New Subject'
                table="subject"
                type="create"
            />
        </div>
    )
}

export default Subjects;