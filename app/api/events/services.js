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
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records
        
        const searchConditions = searchFor ?
            {
                AND: [
                    baseCondition,
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
                ]
            }
        : baseCondition;

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

const updateEvent = async (eventId, data) => {
    try {
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });
        
        if (!event) {
            throw('Event Not Exist in the Database.')
        }

        const class_id = parseInt(data.class_id, 10);

        const updatedEvent =  await prisma.event.update({
            where: { id: eventId },
            data: {
                class_id: class_id,
                title: data?.title,
                description: data?.description,
                date: data?.date,
                start_time: data?.start_time,
                end_time: data?.end_time
            }
        });
    
        return updatedEvent;
    } catch (error) {
        console.error('Errro in updating event : ', error);
        throw(error)
    }
}

const deleteEvent = async (eventId) => {
    try {
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });
        
        if (!event) {
            throw('Event Not Exist in the Database.')
        }

        const now = new Date();

        // 2. Soft delete the event
        const deletedEvent =  await prisma.event.update({
            where: { id: eventId },
            data: { deleted_at: now },
        });
    
        return deletedEvent;
    } catch (error) {
        console.error('Errro in deleting event : ', error);
        throw(error)
    }
}

module.exports = {
    createEvent,
    fetchEvents,
    updateEvent,
    deleteEvent
}