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
        const [data, totalRows] = await prisma.$transaction([
            prisma.event.findMany({
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
            prisma.event.count()
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