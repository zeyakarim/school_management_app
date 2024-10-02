import TableComponent from "@/components/Table/Table";
import { columns, users } from "@/lib/data";

const Students = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={columns}
                users={users}
                title='All Students'
            />
        </div>
    )
};

export default Students;