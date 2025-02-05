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

const createClass = async (data) => {
    try {
        const supervisor_id = parseInt(data.supervisor_id, 10);
        const capacity = parseInt(data.capacity, 10)

        const classCreated = await prisma.class.create({
            data: {
                name: data.class, // Assuming 'subject' field exists
                capacity: capacity,
                supervisor_id: supervisor_id,
            },
        });

        return classCreated;
    } catch (error) {
        console.log("Error in creating class : ", error)
        throw(error)
    }
}

const fetchClasses = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor ? 
            {
                OR: [
                    { name: { contains: searchFor, mode: 'insensitive' } },
                    {
                        supervisor: {
                            OR: [
                                { first_name: { contains: searchFor, mode: 'insensitive' } },
                                { last_name: { contains: searchFor, mode: 'insensitive' } },
                            ],
                        },
                    },
                ],
            }
        : {};

        const [data, totalRows] = await prisma.$transaction([
            prisma.class.findMany({
                where: searchConditions,
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
            prisma.class.count({
                where: searchConditions
            })
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
    createClass,
    fetchClasses
}