const prisma = require("@/config/database");

const simplifiedSubjects = (subjects) => {
    return subjects?.map((subject) => {
        const lastName = subject?.teacher?.last_name ? subject?.teacher?.last_name : '';
        const simplifiedSubject = {
            ...subject,
            teacher: subject?.teacher?.first_name + ' ' + lastName
        }
        return simplifiedSubject
    })
};

const fetchSubjects = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.subject.findMany({
                include: {
                    teacher: {
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
            prisma.subject.count()
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            subjects: simplifiedSubjects(data), 
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
    fetchSubjects
}