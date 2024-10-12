import { teacherColumns } from '@/components/Columns';
import TableComponent from '@/components/Table/Table';
import { teachers } from '@/lib/data';

const Teachers = () => {
  return (
    <div className='w-[98%] mx-auto'>
      <TableComponent 
        columns={teacherColumns}
        data={teachers}
        title='All Teachers'
      />
    </div>
  )
}

export default Teachers;