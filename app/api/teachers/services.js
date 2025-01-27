const prisma = require("@/config/database");

const fetchTeachers = async (searchFor, page, limit, skipRecord) => {
    try {
        // Adding mode: 'insensitive' makes the search case-insensitive (e.g., matching both "John" and "john").
        const [data, totalRows] = await prisma.$transaction([
            prisma.teacher.findMany({
                where: {
                    OR: [
                        { username: { contains: searchFor, mode: 'insensitive' } }, // Partial match, case-insensitive
                        { first_name: { contains: searchFor, mode: 'insensitive' } }, // Partial match, case-insensitive
                        { last_name: { contains: searchFor, mode: 'insensitive' } },
                        { email: { contains: searchFor, mode: 'insensitive' } },
                        { phone: { contains: searchFor, mode: 'insensitive' } },
                        { address: { contains: searchFor, mode: 'insensitive' } },
                        { blood_type: { contains: searchFor, mode: 'insensitive' } },
                        // { gender: { contains: searchFor } },
                    ],
                },
                skip: skipRecord,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prisma.class.count()
        ]);
        const maxPage = Math.ceil(totalRows / limit);
        return { 
            teachers: data, 
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
    fetchTeachers
}