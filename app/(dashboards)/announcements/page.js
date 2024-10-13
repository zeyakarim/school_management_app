import { announcementColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { announcements } from "@/lib/data";

const Announcements = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                title={'All Announcements'}
                columns={announcementColumns}
                data={announcements}
            />
        </div>
    )
}

export default Announcements;