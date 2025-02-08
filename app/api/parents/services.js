const prisma = require("@/config/database");

const createParent = async (data) => {
    try {
        const createdParent = await prisma.parent.create({
            data: data
        });

        return createdParent;
    } catch (error) {
        console.error('error in creating parent : ', error)
        throw(error)
    }
}

const fetchParents = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records
        
        const searchConditions = searchFor ?
            {
                AND: [
                    baseCondition, 
                    {
                        OR: [
                            { username: { contains: searchFor, mode: 'insensitive' } },
                            { first_name: { contains: searchFor, mode: 'insensitive' } },
                            { last_name: { contains: searchFor, mode: 'insensitive' } },
                            { email: { contains: searchFor, mode: 'insensitive' } },
                            { phone: { contains: searchFor, mode: 'insensitive' } },
                            { address: { contains: searchFor, mode: 'insensitive' } },
                        ],
                    }
                ]
            }
        : baseCondition;

        const [data, totalRows] = await prisma.$transaction([
            prisma.parent.findMany({
                where: searchConditions,
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.parent.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            parents: data, 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
}

const deleteParent = async (parentId) => {
    try {
        const parent = await prisma.parent.findUnique({
            where: { id: parentId },
        });
        
        if (!parent) {
            throw('Parent Not Exist in the Database.')
        }

        const now = new Date();

        // 2. Soft delete the parent
        const deletedParent =  await prisma.parent.update({
            where: { id: parentId },
            data: { deleted_at: now },
        });
    
        return deletedParent;
    } catch (error) {
        console.error('Errro in deleting parent : ', error);
        throw(error)
    }
}


module.exports = {
    createParent,
    fetchParents,
    deleteParent
}