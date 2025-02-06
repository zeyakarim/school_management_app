const prisma = require("@/config/database");

const createGrade = async (data) => {
    try {
        const createdGrade = await prisma.grade.create({
            data: data
        });
        
        return createdGrade;
    } catch(error) {
        console.error('Error in creating grade : ', error)
        throw(error)
    }
}

const fetchGrades = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.grade.findMany({
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.grade.count()
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            grades: data, 
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
    createGrade,
    fetchGrades
}