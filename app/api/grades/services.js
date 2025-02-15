const prisma = require("@/config/database");
import { handlePrismaError } from "@/utils/prismaErrorHandler";

const createGrade = async (data) => {
    try {
        const createdGrade = await prisma.grade.create({
            data: data
        });
        
        return createdGrade;
    } catch(error) {
        handlePrismaError(error);
    }
}

const fetchGrades = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records
        
        const searchConditions = searchFor ?
            {
                AND: [
                    baseCondition,
                    {
                        OR: [
                            { level : { contains: searchFor, mode: 'insensitive' } },
                        ],
                    }
                ]
            }
        : baseCondition;

        const [data, totalRows] = await prisma.$transaction([
            prisma.grade.findMany({
                where: searchConditions,
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.grade.count({
                where: searchConditions
            })
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

const updateGrade = async (gradeId, data) => {
    try {
        const grade = await prisma.grade.findUnique({
            where: { id: gradeId },
        });
        
        if (!grade) {
            throw { message: 'Grade Not Exist in the Database.' }
        }

        const updatedGrade =  await prisma.grade.update({
            where: { id: gradeId },
            data: data,
        });
    
        return updatedGrade;
    } catch (error) {
        handlePrismaError(error);
    }
}

const deleteGrade = async (gradeId) => {
    try {
        const grade = await prisma.grade.findUnique({
            where: { id: gradeId },
        });
        
        if (!grade) {
            throw { message: 'Grade Not Exist in the Database.' }
        }

        const now = new Date();

        // 2. Soft delete the grade
        const deletedGrade =  await prisma.grade.update({
            where: { id: gradeId },
            data: { deleted_at: now },
        });
    
        return deletedGrade;
    } catch (error) {
        handlePrismaError(error);
    }
}

module.exports = {
    createGrade,
    fetchGrades,
    updateGrade,
    deleteGrade
}