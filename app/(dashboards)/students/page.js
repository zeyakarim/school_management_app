import { studentColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { studentUsers } from "@/lib/data";

const Students = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={studentColumns}
                data={studentUsers}
                title='All Students'
            />
        </div>
    )
};

export default Students;