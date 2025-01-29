const prisma = require("@/config/database");

const fetchParents = async (searchFor, page, limit, skipRecord) => {
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
                ],
                }
            : {};

        const [data, totalRows] = await prisma.$transaction([
            prisma.parent.findMany({
                where: searchConditions,
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.parent.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            parents: data, 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
}

module.exports = {
    fetchParents
}