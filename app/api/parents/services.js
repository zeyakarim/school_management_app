const prisma = require("@/config/database");

const fetchParents = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.parent.findMany({
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.parent.count()
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