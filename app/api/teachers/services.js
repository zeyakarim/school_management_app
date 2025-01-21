const prisma = require("@/config/database");

const fetchTeachers = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.teacher.findMany({
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