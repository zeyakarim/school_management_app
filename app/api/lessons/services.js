const prisma = require("@/config/database");
const { handlePrismaError } = require("@/utils/prismaErrorHandler");

const simplifiedLessons = (lessons) => {
    return lessons?.map((lesson) => {
        const lastName = lesson?.teacher?.last_name ? lesson?.teacher?.last_name : '';
        const simplifiedLesson = {
            ...lesson,
            teacher: lesson?.teacher?.first_name + ' ' + lastName,
            class: lesson?.class?.name,
            subject: lesson?.subject?.name
        }
        return simplifiedLesson
    })
}

const createLesson = async (data) => {
    try {
        const teacher_id = parseInt(data.teacher_id, 10);
        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);

        const createdLesson = await prisma.lesson.create({
            data: {
                name: data?.lesson,
                subject_id: subject_id,
                teacher_id: teacher_id,
                class_id: class_id,
                start_time: data?.start_time,
                end_time: data?.end_time,
                day: data?.day
            }
        });

        return createdLesson;
    } catch (error) {
        handlePrismaError(error);
    }
}

const fetchLessons = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records

        const searchConditions = searchFor ?
            {
                AND: [
                    baseCondition,
                    {
                        OR: [
                            { name: { contains: searchFor, mode: 'insensitive' } },
                            {
                                teacher: {
                                    OR: [
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, // Search in teacher's first name
                                        { last_name: { contains: searchFor, mode: 'insensitive' } },  // Search in teacher's last name
                                    ],
                                },
                            },
                            {
                                class: {
                                    OR: [
                                        { name: { contains: searchFor, mode: 'insensitive' } },
                                    ],
                                },
                            },
                            {
                                subject: {
                                    OR: [
                                        { name: { contains: searchFor, mode: 'insensitive' } },
                                    ],
                                },
                            },
                        ],
                    }
                ]
            }
        : baseCondition; 

        const [data, totalRows] = await prisma.$transaction([
            prisma.lesson.findMany({
                where: searchConditions,
                include: {
                    class: {
                        select: {
                            name: true
                        }
                    },
                    teacher: {
                        select: {
                            first_name: true,
                            last_name: true
                        },
                    },
                    subject: {
                        select: {
                            name: true
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.lesson.count({
                where: searchConditions,
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            lessons: simplifiedLessons(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

const updateLesson = async (lessonId, data) => {
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        
        if (!lesson) {
            throw { message: 'Lesson Not Exist in the Database.' }
        }

        const teacher_id = parseInt(data.teacher_id, 10);
        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);

        const updatedLesson =  await prisma.lesson.update({
            where: { id: lessonId },
            data: {
                name: data?.lesson,
                subject_id: subject_id,
                teacher_id: teacher_id,
                class_id: class_id,
                start_time: data?.start_time,
                end_time: data?.end_time,
                day: data?.day
            }
        });
    
        return updatedLesson;
    } catch (error) {
        handlePrismaError(error);
    }
}

const deleteLesson = async (lessonId) => {
    try {
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        
        if (!lesson) {
            throw { message: 'Lesson Not Exist in the Database.' }
        }

        const now = new Date();

        // 2. Soft delete the lesson
        const deletedLesson =  await prisma.lesson.update({
            where: { id: lessonId },
            data: { deleted_at: now },
        });
    
        return deletedLesson;
    } catch (error) {
        handlePrismaError(error);
    }
}

module.exports = {
    createLesson,
    fetchLessons,
    updateLesson,
    deleteLesson
}