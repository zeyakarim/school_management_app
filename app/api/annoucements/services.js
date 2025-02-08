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

const createAnnouncement = async (data) => {
    try {
        const class_id = parseInt(data.class_id, 10);

        const createdAnnoucement = await prisma.annoucement.create({
            data: {
                class_id: class_id,
                title: data?.title,
                description: data?.description,
                date: data?.date
            }
        });

        return createdAnnoucement;
    } catch (error) {
        console.error('Error in creating announcement : ', error);
        throw(error)
    }
}

const fetchAnnoucements = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records

        const searchConditions = searchFor
            ? {
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
                      },
                  ],
              }
            : baseCondition;

        const [data, totalRows] = await prisma.$transaction([
            prisma.annoucement.findMany({
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
            prisma.annoucement.count({
                where: searchConditions
            })
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

const deleteAnnoucement = async (announcementId) => {
    try {
        const announcement = await prisma.annoucement.findUnique({
            where: { id: announcementId },
            // include: { class: true },
        });
        
        if (!announcement) {
            throw('Annoucement Not Exist in the Database.')
        }

        const now = new Date();

        // 2. Soft delete the Announcement
        const deletedAnnoucement =  await prisma.annoucement.update({
            where: { id: announcementId },
            data: { deleted_at: now },
        });
    
        return deletedAnnoucement;
    } catch (error) {
        console.error('Errro in deleting annoucement : ', error);
        throw(error)
    }
}

module.exports = {
    createAnnouncement,
    fetchAnnoucements,
    deleteAnnoucement
}