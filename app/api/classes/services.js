const prisma = require("@/config/database");

const simplifiedClasses = (classes) => {
    return classes?.map((classData) => {
        const lastName = classData?.supervisor?.last_name ? classData?.supervisor?.last_name : '';
        const simplifiedClass = {
            ...classData,
            supervisor: classData?.supervisor?.first_name + ' ' + lastName
        }
        return simplifiedClass
    })
}

const fetchClasses = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.class.findMany({
                include: {
                    supervisor: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.class.count()
        ]);
        const maxPage = Math.ceil(totalRows / limit);
        return { 
            classes: simplifiedClasses(data), 
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
    fetchClasses
}