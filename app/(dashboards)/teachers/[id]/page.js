import DetailsPage from "@/components/DetailsPage";
import { teacherShortcutItems } from "@/lib/data";

const TeacherDetails = ({params}) => {
    const { id } = params;

    return (
        <DetailsPage 
            scheduleTitle={`Teacher Schedule`}  
            shortcutItems={teacherShortcutItems}
            endPoint={'/teachers'}
            dataPosition={'teacherDetails'}
            id={id}
        />
    )
}

export default TeacherDetails