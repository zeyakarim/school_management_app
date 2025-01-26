import Table from '@/components/Table/Table';

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
    field: 'created_at',
    headerName: 'Created AT',
    headerClassName: 'super-app-theme--header',
    flex: 1.7
  },
];

const Teachers = () => {

  return (
    <div className='w-[98%] mx-auto'>
      <Table
        columns={columns}
        rowId={'id'}
        endPoint={'/teachers'}
        dataPosition={'teachers'}
        checkBoxSelection={false}
        navigateOnRowClickEndpoint={`/teachers`}
        version='version-1'
        title='Teachers'
        dialogTitle='Create A New Teacher'
        table="teacher"
        type="create"
      />
    </div>
  )
}

export default Teachers;