import { studentColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { students } from "@/lib/data";

const Students = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={studentColumns}
                data={students}
                title='All Students'
            />
        </div>
    )
};

export default Students;