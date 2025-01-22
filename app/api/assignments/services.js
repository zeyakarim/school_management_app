const prisma = require("@/config/database");

const simplifiedAssignments = (assignments) => {
    return assignments?.map((assignment) => {
        const lastName = assignment?.teacher?.last_name ? assignment?.teacher?.last_name : '';
        const simplifiedAssignment = {
            ...assignment,
            teacher: assignment?.teacher?.first_name + ' ' + lastName,
            subject: assignment?.subject?.name,
            lesson: assignment?.lesson?.name
        }
        return simplifiedAssignment
    })
}

const fetchAssignments = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.assignment.findMany({
                include: {
                    teacher: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    },
                    subject: {
                        select: {
                            name: true
                        }
                    },
                    lesson: {
                        select: {
                            name: true
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.assignment.count()
        ]);

        const maxPage = Math.ceil(totalRows / limit);

        return { 
            assignments: simplifiedAssignments(data), 
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
    fetchAssignments
}