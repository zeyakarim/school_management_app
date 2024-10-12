import { parentColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { parents } from "@/lib/data";

const Parents = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={parentColumns}
                data={parents}
                title='All Parents'
            />
        </div>
    )
};

export default Parents;