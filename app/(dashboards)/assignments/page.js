import { assignmentColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { assignments } from "@/lib/data";

const Assignments = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                title={'All Assignments'}
                columns={assignmentColumns}
                data={assignments}
            />
        </div>
    )
}

export default Assignments;