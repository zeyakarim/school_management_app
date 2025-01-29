const prisma = require("@/config/database");

const fetchTeachers = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor
            ? {
                OR: [
                    { username: { contains: searchFor, mode: 'insensitive' } },
                    { first_name: { contains: searchFor, mode: 'insensitive' } },
                    { last_name: { contains: searchFor, mode: 'insensitive' } },
                    { email: { contains: searchFor, mode: 'insensitive' } },
                    { phone: { contains: searchFor, mode: 'insensitive' } },
                    { address: { contains: searchFor, mode: 'insensitive' } },
                    { blood_type: { contains: searchFor, mode: 'insensitive' } },
                ],
                }
            : {}; // 🔥 Prevents an unnecessary OR clause when `searchFor` is empty.

        // Adding mode: 'insensitive' makes the search case-insensitive (e.g., matching both "John" and "john").
        const [data, totalRows] = await prisma.$transaction([
            prisma.teacher.findMany({
                where: searchConditions,
                skip: skipRecord,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prisma.teacher.count({
                where: searchConditions,
            })
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