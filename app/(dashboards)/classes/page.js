import { classesColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { classes } from "@/lib/data";

const Classes = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent
                title={'All Classes'}
                columns={classesColumns}
                data={classes}
                dialogTitle='Create A New Class'
                table="class"
                type="create"
            />
        </div>
    )
}

export default Classes;