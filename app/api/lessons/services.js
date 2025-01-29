const prisma = require("@/config/database");

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

const fetchLessons = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor ? 
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
        : {}; 

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

module.exports = {
    fetchLessons
}