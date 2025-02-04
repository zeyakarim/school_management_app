import DetailsPage from '@/components/DetailsPage';
import { studentShortcutItems } from '@/lib/data';

const StudentDetails = ({params}) => {
    const { id } = params;
    return (
        <div>
            <DetailsPage
                id={id} 
                scheduleTitle={`Student Schedule`}  
                shortcutItems={studentShortcutItems}
            />
        </div>
    )
}

export default StudentDetails;