import DetailsPage from "@/components/DetailsPage";
import { teacherDetailsItems, teacherShortcutItems } from "@/lib/data";

const TeacherDetails = ({params}) => {
    const { id } = params;
    return (
        <DetailsPage 
            scheduleTitle={`Teacher Schedule`} 
            detailsItems={teacherDetailsItems} 
            shortcutItems={teacherShortcutItems}
            id={id}
        />
    )
}

export default TeacherDetails