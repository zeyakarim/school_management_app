const prisma = require("@/config/database");
const { handlePrismaError } = require("@/utils/prismaErrorHandler");
const { putSingleDocumentS3, readDocumentsFromS3 } = require("@/utils/s3");
const bucketName = process.env.AWS_BUCKET;

const createTeacher = async (formData, file) => {
    try {
        const mimeType = file.type;
        const data = {};
        formData.forEach((value, key) => {
            if (key !== "file") { // Skip the file key
                data[key] = value.trim() === "" ? null : value; // Handle empty strings
            }
        });

        const teacher = await prisma.teacher.create({
            data: data,
        });

        const fileUrl = await putSingleDocumentS3("teachers", teacher?.id, file, bucketName, mimeType);

        const updatedTeacher = await prisma.teacher.update({
            where: { id: teacher?.id },
            data: { img: fileUrl },
        });

        return updatedTeacher;
    } catch (error) {
        handlePrismaError(error);
    }
}

const prepareTeachersData = async (teachers) => {
    const structuredData = await Promise.all(teachers?.map(async (teacher) => {
        let attachDocsUrl = null;
        if (teacher?.img) {
            attachDocsUrl = await readDocumentsFromS3('teachers', teacher?.img, bucketName);
        }
        teacher['img'] = attachDocsUrl?.[0] || null;
        return teacher;
    }));
    return structuredData;
}

const fetchTeachers = async (searchFor, page, limit, skipRecord) => {
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
                            { blood_type: { contains: searchFor, mode: 'insensitive' } },
                        ],
                    }
                ]
            }
        : baseCondition; // 🔥 Prteachers an unnecessary OR clause when `searchFor` is empty.

        // Adding mode: 'insensitive' makes the search case-insensitive (e.g., matching both "John" and "john").
        const [data, totalRows] = await prisma.$transaction([
            prisma.teacher.findMany({
                where: searchConditions,
                skip: skipRecord,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prisma.teacher.count({
                where: searchConditions,
            })
        ]);
        const maxPage = Math.ceil(totalRows / limit);
        return { 
            teachers: await prepareTeachersData(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

const deleteTeacher = async (teacherId) => {
    try {
        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
        });
        
        if (!teacher) {
            throw { message: 'Teacher Not Exist in the Database.' }
        }

        const now = new Date();

        // 2. Soft delete the teacher
        const deletedTeacher =  await prisma.teacher.update({
            where: { id: teacherId },
            data: { deleted_at: now },
        });
    
        return deletedTeacher;
    } catch (error) {
        handlePrismaError(error);
    }
};

const updateTeacher = async (teacherId, formData, file) => {
    try {
        const data = {};
        formData.forEach((value, key) => {
            if (key !== "file") { // Skip the file key
                data[key] = value.trim() === "" ? null : value; // Handle empty strings
            }
        })

        const teacher = await prisma.teacher.findUnique({
            where: { id: teacherId },
        });

        if (!teacher) {
            throw { message: 'Teacher Not Exist in the Database.' }
        }

        if (file) {
            const mimeType = file.type;
            const fileUrl = await putSingleDocumentS3("teachers", teacher?.id, file, bucketName, mimeType);
            data['img'] = fileUrl;
        }

        // 2. Soft delete the teacher
        const updatedTeacher =  await prisma.teacher.update({
            where: { id: teacherId },
            data: data,
        });
    
        return updatedTeacher;
    } catch (error) {
        handlePrismaError(error);
    }
}

module.exports = {
    createTeacher,
    fetchTeachers,
    deleteTeacher,
    updateTeacher
}