const prisma = require("@/config/database");
const { handlePrismaError } = require("@/utils/prismaErrorHandler");

const simplifiedResults = (results) => {
    return results?.map((result) => {
        const lastName = result?.student?.last_name ? result?.student?.last_name : '';
        const lastTeacherName = result?.teacher?.last_name ? result?.teacher?.last_name : '';
        const simplifiedResult = {
            ...result,
            student: result?.student?.first_name + ' ' + lastName,
            teacher: result?.teacher?.first_name + ' ' + lastTeacherName,
            exam: result?.exam?.title,
            grade: result?.grade?.level,
            assignment: result?.assignment?.title,
            class: result?.class?.name,
            subject: result?.subject?.name
        }
        return simplifiedResult
    })
}

const createResult = async (data) => {
    try {
        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);
        const grade_id = parseInt(data.grade_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);
        const student_id = parseInt(data.student_id, 10);
        const exam_id = parseInt(data.exam_id, 10);

        const createdResult = await prisma.result.create({
            data: {
                marks: data?.marks,
                total: parseInt(data?.total),
                percentage: data?.percentage,
                subject_id: subject_id,
                class_id: class_id,
                grade_id: grade_id,
                teacher_id: teacher_id,
                student_id: student_id,
                exam_id: exam_id
            }
        });

        return createdResult;
    } catch (error) {
        handlePrismaError(error);
    }
}

const fetchResults = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records

        const searchConditions = searchFor && searchFor?.trim() !== "" 
        ? isNaN(searchFor)
            ? {
                AND: [
                    baseCondition, 
                    { 
                        OR: [
                            {
                                student: {
                                    OR: [
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, 
                                        { last_name: { contains: searchFor, mode: 'insensitive' } }
                                    ],
                                },
                            },
                            {
                                exam: {
                                    OR: [
                                        { title: { contains: searchFor, mode: 'insensitive' } }
                                    ],
                                },
                            },
                            {
                                assignment: {
                                    OR: [
                                        { title: { contains: searchFor, mode: 'insensitive' } }
                                    ],
                                },
                            },
                            {
                                teacher: {
                                    OR: [
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, 
                                        { last_name: { contains: searchFor, mode: 'insensitive' } }
                                    ],
                                },
                            },
                            {
                                subject: {
                                    OR: [
                                        { name: { contains: searchFor, mode: 'insensitive' } }
                                    ],
                                },
                            },
                            {
                                class: {
                                    OR: [
                                        { name: { contains: searchFor, mode: 'insensitive' } }
                                    ],
                                },
                            },
                        ]
                    }
                ]
            }
            :  {
                AND: [
                    baseCondition,{ // If searchFor is a number, search by ID fields
                    OR: [
                            { 
                                // marks: parseInt(searchFor),
                                total: parseInt(searchFor),
                                // grade: {
                                //     OR: [
                                //         { level: parseInt(searchFor) }
                                //     ],
                                // },
                            },
                        ]
                    }
                ]
            }
        : baseCondition;

        const [data, totalRows] = await prisma.$transaction([
            prisma.result.findMany({
                where: searchConditions,
                include: {
                    student: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    },
                    exam: {
                        select: {
                            title: true,
                        }
                    },
                    grade: {
                        select: {
                            level: true
                        }
                    },
                    assignment: {
                        select: {
                            title: true
                        }
                    },
                    teacher: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    },
                    subject: {
                        select: {
                            name: true,
                        }
                    },
                    class: {
                        select: {
                            name: true,
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.result.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            results: simplifiedResults(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

const updateResult = async (resultId, data) => {
    try {
        const result = await prisma.result.findUnique({
            where: { id: resultId },
        });
        
        if (!result) {
            throw { message: 'Result Not Exist in the Database.' }
        }

        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);
        const grade_id = parseInt(data.grade_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);
        const student_id = parseInt(data.student_id, 10);
        const exam_id = parseInt(data.exam_id, 10);

        const updatedResult =  await prisma.result.update({
            where: { id: resultId },
            data: {
                marks: data?.marks,
                total: parseInt(data?.total),
                percentage: data?.percentage,
                subject_id: subject_id,
                class_id: class_id,
                grade_id: grade_id,
                teacher_id: teacher_id,
                student_id: student_id,
                exam_id: exam_id
            }
        });
    
        return updatedResult;
    } catch (error) {
        handlePrismaError(error);
    }
}

const deleteResult = async (resultId) => {
    try {
        const result = await prisma.result.findUnique({
            where: { id: resultId },
        });
        
        if (!result) {
            throw { message: 'Result Not Exist in the Database.' }
        }

        const now = new Date();

        // 2. Soft delete the result
        const deletedResult =  await prisma.result.update({
            where: { id: resultId },
            data: { deleted_at: now },
        });
    
        return deletedResult;
    } catch (error) {
        handlePrismaError(error);
    }
}

module.exports = {
    createResult,
    fetchResults,
    updateResult,
    deleteResult
}