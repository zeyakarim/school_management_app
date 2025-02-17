const prisma = require("@/config/database");
const { handlePrismaError } = require("@/utils/prismaErrorHandler");
const { readDocumentsFromS3, putSingleDocumentS3 } = require("@/utils/s3");
const bucketName = process.env.AWS_S3_BUCKET;

const simplifiedStudents = async (students) => {
    const structuredData = await Promise.all(students?.map(async (student) => {
        let attachDocsUrl = null;
        if (student?.img) {
            attachDocsUrl = await readDocumentsFromS3('students', student?.id, bucketName);
        }
        student['parent'] =  student?.parent ? `${student.parent.first_name} ${student.parent.last_name}` : null,
        student['class'] = student?.class?.name || null,
        student['img'] = attachDocsUrl?.[0] || null;
        return student;
    }));
    return structuredData;
};

const createStudent = async (formData, file) => {
    try {
        const mimeType = file.type;
        const data = {};
        formData.forEach((value, key) => {
            if (key !== "file") { // Skip the file key
                if (["parent_id", "class_id"].includes(key)) {
                    data[key] = value.trim() === "" ? null : parseInt(value, 10); // Convert to number
                } else {
                    data[key] = value.trim() === "" ? null : value; // Handle empty strings
                }
            }
        });

        const student = await prisma.student.create({
            data: data,
        });

        const fileUrl = await putSingleDocumentS3("students", student.id, file, bucketName, mimeType);

        const updatedStudent = await prisma.student.update({
            where: { id: student.id },
            data: { img: fileUrl },
        });

        return updatedStudent;
    } catch (error) {
        handlePrismaError(error);
    }
}

const fetchStudents = async (searchFor, page, limit, skipRecord) => {
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
                            {
                                parent: {
                                    OR: [
                                        { username: { contains: searchFor, mode: 'insensitive' } },
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, // Search in student's first name
                                        { last_name: { contains: searchFor, mode: 'insensitive' } },  // Search in student's last name
                                    ],
                                },
                            },
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
            prisma.student.findMany({
                where: searchConditions,
                include: {
                    parent: {
                        select: {
                            username: true,
                            first_name: true,
                            last_name: true
                        },
                    },
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
            prisma.student.count({
                where: searchConditions,
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            students: await simplifiedStudents(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

const updateStudent = async (studentId, formData, file) => {
    try {
        const data = {};
        formData.forEach((value, key) => {
            if (key !== "file") { // Skip the file key
                if (["parent_id", "class_id"].includes(key)) {
                    data[key] = value.trim() === "" ? null : parseInt(value, 10); // Convert to number
                } else {
                    data[key] = value.trim() === "" ? null : value; // Handle empty strings
                }
            }
        });

        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });

        if (!student) {
            throw { message: 'Student Not Exist in the Database.' }
        }

        if (file) {
            const mimeType = file.type;
            const fileUrl = await putSingleDocumentS3("students", student?.id, file, bucketName, mimeType);
            data['img'] = fileUrl;
        }

        // 2. Soft delete the student
        const updatedStudent =  await prisma.student.update({
            where: { id: studentId },
            data: data,
        });
    
        return updatedStudent;
    } catch (error) {
        handlePrismaError(error);
    }
}

const deleteStudent = async (studentId) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
        });
        
        if (!student) {
            throw { message: 'Student Not Exist in the Database.' }
        }

        const now = new Date();

        // 2. Soft delete the student
        const deletedStudent =  await prisma.student.update({
            where: { id: studentId },
            data: { deleted_at: now },
        });
    
        return deletedStudent;
    } catch (error) {
        handlePrismaError(error);
    }
}

module.exports = {
    createStudent,
    updateStudent,
    fetchStudents,
    deleteStudent
}