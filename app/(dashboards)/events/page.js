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
        field: 'start_time',
        headerName: 'Start Time',
        headerClassName: 'super-app-theme--header',
        flex: 1.7,
    },
    {
        field: 'end_time',
        headerName: 'End Time',
        headerClassName: 'super-app-theme--header',
        flex: 1.7
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

const Events = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <Table 
                title={'All Events'}
                columns={columns}
                rowId={'id'}
                endPoint={'/events'}
                dataPosition={'events'}
                checkBoxSelection={false}
                version='version-1'
                dialogTitle='Create A New Events'
                table="event"
                type="create"
            />
        </div>
    )
}

export default Events;