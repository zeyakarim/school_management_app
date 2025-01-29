import prisma from "@/config/database";

const simplifiedEvents = (events) => {
    return events?.map((event) => {
        const simplifiedEvent = {
            ...event,
            class: event?.class?.name
        }
        return simplifiedEvent
    })
}

const fetchEvents = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor ? 
            {
                OR: [
                    { title: { contains: searchFor, mode: 'insensitive' } },
                    { description: { contains: searchFor, mode: 'insensitive' } },
                    {
                        class: {
                            OR: [
                                { name: { contains: searchFor, mode: 'insensitive' } },
                            ],
                        },
                    },
                ],
            }
        : {};

        const [data, totalRows] = await prisma.$transaction([
            prisma.event.findMany({
                where: searchConditions,
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
            prisma.event.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);

        return { 
            events: simplifiedEvents(data), 
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
    fetchEvents
}