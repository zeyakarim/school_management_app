import Table from "@/components/Table/Table";

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
];

const Results = () => {
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
            />
        </div>
    )
}

export default Results;