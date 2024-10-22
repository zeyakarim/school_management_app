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
                dialogTitle='Create Student Result'
                table="result"
                type="create"
            />
        </div>
    )
}

export default Results;