const prisma = require("@/config/database");

const simplifiedStudents = (students) => {
    return students?.map((student) => {
        const simplifiedStudent = {
            ...student,
            parent: student?.parent?.first_name + ' ' + student?.parent?.last_name,
            class: student?.class?.name,
        }
        return simplifiedStudent
    })
}

const fetchStudents = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor ? 
            {
                OR: [
                    { username: { contains: searchFor, mode: 'insensitive' } },
                    { first_name: { contains: searchFor, mode: 'insensitive' } },
                    { last_name: { contains: searchFor, mode: 'insensitive' } },
                    { email: { contains: searchFor, mode: 'insensitive' } },
                    { phone: { contains: searchFor, mode: 'insensitive' } },
                    { address: { contains: searchFor, mode: 'insensitive' } },
                    { blood_type: { contains: searchFor, mode: 'insensitive' } },
                    {
                        parent: {
                            OR: [
                                { username: { contains: searchFor, mode: 'insensitive' } },
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
                ],
            }
        : {}; 

        const [data, totalRows] = await prisma.$transaction([
            prisma.student.findMany({
                where: searchConditions,
                include: {
                    parent: {
                        select: {
                            username: true,
                            first_name: true,
                            last_name: true
                        },
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
            prisma.student.count({
                where: searchConditions,
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            students: simplifiedStudents(data), 
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
    fetchStudents
}