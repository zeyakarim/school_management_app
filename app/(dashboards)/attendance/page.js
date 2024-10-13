import { attendanceColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { attendance } from "@/lib/data";

const Attendance = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                title={'All Attendance'}
                columns={attendanceColumns}
                data={attendance}
            />
        </div>
    )
}

export default Attendance;