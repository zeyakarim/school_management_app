import { eventColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { events } from "@/lib/data";

const Events = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent 
                title={'All Events'}
                columns={eventColumns}
                data={events}
            />
        </div>
    )
}

export default Events;