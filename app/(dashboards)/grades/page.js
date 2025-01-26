import Table from "@/components/Table/Table";

const columns = [
    {
        field: 'level',
        headerName: 'Level',
        headerClassName: 'super-app-theme--header',
        flex: 2,
    },
    {
        field: 'created_at',
        headerName: 'Created At',
        headerClassName: 'super-app-theme--header',
        flex: 2
    },
];

const Exams = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <Table
                title={'Grades'}
                columns={columns}
                rowId={'id'}
                endPoint={'/grades'}
                dataPosition={'grades'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Grade'
                table="grade"
                type="create"
            />
        </div>
    )
}

export default Exams;