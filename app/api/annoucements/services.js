const prisma = require("@/config/database");

const simplifiedAnnoucements = (annoucements) => {
    return annoucements?.map((annoucement) => {
        const simplifiedAnnoucement = {
            ...annoucement,
            class: annoucement?.class?.name
        }
        return simplifiedAnnoucement
    })
}

const fetchAnnoucements = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.annoucement.findMany({
                include: {
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
            prisma.annoucement.count()
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            annoucements: simplifiedAnnoucements(data), 
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
    fetchAnnoucements
}