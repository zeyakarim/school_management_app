const prisma = require("@/config/database");

const simplifiedAssignments = (assignments) => {
    return assignments?.map((assignment) => {
        const lastName = assignment?.teacher?.last_name ? assignment?.teacher?.last_name : '';
        const simplifiedAssignment = {
            ...assignment,
            teacher: assignment?.teacher?.first_name + ' ' + lastName,
            subject: assignment?.subject?.name,
            lesson: assignment?.lesson?.name,
            class: assignment?.class?.name
        }
        return simplifiedAssignment
    })
}

const createAssignment = async (data) => {
    try {
        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);
        const lesson_id = parseInt(data.lesson_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);

        const createdAssignment = await prisma.assignment.create({
            data: {
                title: data?.title,
                subject_id: subject_id,
                class_id: class_id,
                lesson_id: lesson_id,
                teacher_id: teacher_id,
                submit_date: data?.submit_date,
                given_date: data?.given_date
            }
        });
        return createdAssignment;
    } catch(error) {
        console.error('Error in creating assignment : ', error);
        throw(error)
    }
}

const fetchAssignments = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor ? 
            {
                OR: [
                    { title: { contains: searchFor, mode: 'insensitive' } },
                    {
                        teacher: {
                            OR: [
                                { first_name: { contains: searchFor, mode: 'insensitive' } }, // Search in teacher's first name
                                { last_name: { contains: searchFor, mode: 'insensitive' } },  // Search in teacher's last name
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
                    {
                        lesson: {
                            OR: [
                                { name: { contains: searchFor, mode: 'insensitive' } },
                            ],
                        },
                    },
                ],
            }
        : {}; 

        const [data, totalRows] = await prisma.$transaction([
            prisma.assignment.findMany({
                where: searchConditions,
                include: {
                    teacher: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    },
                    subject: {
                        select: {
                            name: true
                        }
                    },
                    lesson: {
                        select: {
                            name: true
                        }
                    },
                    class: {
                        select: {
                            name: true
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.assignment.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);

        return { 
            assignments: simplifiedAssignments(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

module.exports = {
    createAssignment,
    fetchAssignments
}