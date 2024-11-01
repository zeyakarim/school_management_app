import { studentColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { students } from "@/lib/data";

// async function fetchStudents() {
//     try {
//       const apiResponse = await fetch('http://localhost:3000/api/students');
//       const result = await apiResponse.json();
//       return result?.data;
//     } catch (error) {
//       throw new Error(error)
//     }
// }
const columns = [
    // { 
    //     field: 'id', 
    //     headerName: 'ID', 
    //     width: 90 
    // },
    {
        field: 'firstName',
        headerName: 'First name',
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'age',
        headerName: 'Age',
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        headerClassName: 'super-app-theme--header',
        flex: 1
    },
  ];

const Students = async () => {
    // const studentsData = await fetchStudents();
    // console.log(studentsData, 'students')
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={columns}
                data={students}
                checkBoxSelection={false}
                version='version-1'
                title='All Students'
                table="student"
                type="create"
                dialogTitle='Create A New Student'
            />
        </div>
    )
};

export default Students;