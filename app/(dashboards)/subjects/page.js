import { subjectColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { subjects } from "@/lib/data";

const Subjects = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={subjectColumns} 
                title={'All Subjects'}
                data={subjects}
                dialogTitle='Create A New Subject'
                table="subject"
                type="create"
            />
        </div>
    )
}

export default Subjects;