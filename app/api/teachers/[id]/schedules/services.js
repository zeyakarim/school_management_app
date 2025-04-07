const prisma = require("@/config/database");
const { handlePrismaError } = require("@/utils/prismaErrorHandler");

const createTeacherSchedule = async (data) => {
    try {
        const class_id = parseInt(data.class_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);
        const subject_id = parseInt(data.subject_id, 10);

        if (isNaN(class_id) || isNaN(teacher_id) || isNaN(subject_id)) {
            throw new Error('Invalid class_id, teacher_id, or subject_id');
        }

        const start_time = new Date(data.start_time);
        const end_time = new Date(data.end_time);

        if (isNaN(start_time.getTime()) || isNaN(end_time.getTime())) {
            throw new Error('Invalid start_time or end_time');
        }

        const teacherSchedule = await prisma.teacherSchedule.create({
            data: {
                day: data.day,
                class_id: class_id,
                teacher_id: teacher_id,
                subject_id: subject_id,
                start_time: start_time,
                end_time: end_time,
            },
        });

        return teacherSchedule;
    } catch (error) {
        handlePrismaError(error);
    }
};

const simplifiedTeacherSchedules = (teacherSchedules) => {
    return teacherSchedules?.map((teacherSchedule) => {
        const simplifiedTeacherSchedules = {
            ...teacherSchedule,
            class: teacherSchedule?.class?.name,
            subject: teacherSchedule?.subject?.name
        }
        return simplifiedTeacherSchedules
    })
}

const fetchTeacherSchedules = async (id) => {
    try {
        const teacherSchedules = await prisma.teacherSchedule.findMany({
            where: { teacher_id: id },
            include: {
                subject: {
                    select: {
                        name: true
                    }
                },
                class: {
                    select: {
                        name: true
                    }
                }
            }
        });

        let schedules = []
        if (teacherSchedules && teacherSchedules?.length > 0) {
            schedules = simplifiedTeacherSchedules(teacherSchedules);
        }

        return schedules;
    } catch (error) {
        handlePrismaError(error)
    }
}

module.exports = {
    createTeacherSchedule,
    fetchTeacherSchedules
}