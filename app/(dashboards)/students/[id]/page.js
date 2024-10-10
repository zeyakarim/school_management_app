import DetailsPage from '@/components/DetailsPage';
import { studentDetailsItems, studentShortcutItems } from '@/lib/data';

const StudentDetails = ({params}) => {
    const { id } = params;
    return (
        <div>
            <DetailsPage
                id={id} 
                scheduleTitle={`Student Schedule`} 
                detailsItems={studentDetailsItems} 
                shortcutItems={studentShortcutItems}
            />
        </div>
    )
}

export default StudentDetails;