import { resultColumns } from "@/components/Columns";
import TableComponent from "@/components/Table/Table";
import { results } from "@/lib/data";

const Results = () => {
    return (
        <div className='w-[98%] mx-auto'>
            <TableComponent
                title={'All Results'}
                columns={resultColumns}
                data={results}
            />
        </div>
    )
}

export default Results;