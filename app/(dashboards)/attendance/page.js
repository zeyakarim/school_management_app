import Table from "@/components/Table/Table";

const columns = [
    {
        field: 'student',
        headerName: 'Student Name',
        headerClassName: 'super-app-theme--header',
        flex: 1.7,
    },
    {
        field: 'date',
        headerName: 'Date',
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'lesson',
        headerName: 'Lesson',
        headerClassName: 'super-app-theme--header',
        flex: 1
    },
    {
        field: 'class',
        headerName: 'Class',
        headerClassName: 'super-app-theme--header',
        flex: 0.7,
    },
    {
        field: 'present',
        headerName: 'Attendance',
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

const Attendance = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <Table 
                title={'Attendance'}
                columns={columns}
                rowId={'id'}
                endPoint={'/attendances'}
                dataPosition={'attendances'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Attendance'
                table="attendance"
                type="create"
            />
        </div>
    )
}

export default Attendance;