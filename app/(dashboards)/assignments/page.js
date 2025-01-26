import Table from "@/components/Table/Table";

const columns = [
    {
        field: 'title',
        headerName: 'Name',
        headerClassName: 'super-app-theme--header',
        flex: 1.7,
    },
    {
        field: 'subject',
        headerName: 'Subject',
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'lesson',
        headerName: 'Lesson',
        headerClassName: 'super-app-theme--header',
        flex: 1.7,
    },
    {
        field: 'teacher',
        headerName: 'Teacher',
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'submit_date',
        headerName: 'Submit Date',
        headerClassName: 'super-app-theme--header',
        flex: 1.7,
    },
    {
        field: 'due_date',
        headerName: 'Due Date',
        headerClassName: 'super-app-theme--header',
        flex: 1.7
    },
    {
        field: 'created_at',
        headerName: 'Created At',
        headerClassName: 'super-app-theme--header',
        flex: 1.7
    },
];

const Assignments = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <Table
                title={'Assignments'}
                columns={columns}
                rowId={'id'}
                endPoint={'/assignments'}
                dataPosition={'assignments'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Assignment'
                table="assignment"
                type="create"
            />
        </div>
    )
}

export default Assignments;