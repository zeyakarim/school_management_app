import { examColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { exams } from "@/lib/data";

const Exams = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                title={'All Exams'}
                columns={examColumns}
                data={exams}
            />
        </div>
    )
}

export default Exams;