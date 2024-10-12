import { lessonColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { lessons } from "@/lib/data";

const Lessons = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                title={'All Lessons'}
                columns={lessonColumns}
                data={lessons}
            />
        </div>
    )
}

export default Lessons;