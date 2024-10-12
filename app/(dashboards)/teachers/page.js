import { teacherColumns } from '@/components/Columns';
import TableComponent from '@/components/Table/Table';
import { users } from '@/lib/data';

const Teachers = () => {
  return (
    <div className='w-[98%] mx-auto'>
      <TableComponent 
        columns={teacherColumns}
        data={users}
        title='All Teachers'
      />
    </div>
  )
}

export default Teachers;