import TableComponent from "@/components/Table/Table";
import { columns, users } from "@/lib/data";

const Parents = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                columns={columns}
                users={users}
                title='All Parents'
            />
        </div>
    )
};

export default Parents;