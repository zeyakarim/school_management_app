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

const createEvent = async (data) => {
    try {
        const class_id = parseInt(data.class_id, 10);

        const createdEvent = await prisma.event.create({
            data: {
                class_id: class_id,
                title: data?.title,
                description: data?.description,
                date: data?.date,
                start_time: data?.start_time,
                end_time: data?.end_time
            }
        });

        return createdEvent;
    } catch (error) {
        console.error('Error in creating event : ', error);
        throw(error)
    }
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
    createEvent,
    fetchEvents
}