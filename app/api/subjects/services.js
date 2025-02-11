const prisma = require("@/config/database");

const simplifiedSubjects = (subjects) => {
    return subjects?.map((subject) => {
        const lastName = subject?.teacher?.last_name ? subject?.teacher?.last_name : '';
        const simplifiedSubject = {
            ...subject,
            teacher: subject?.teacher?.first_name + ' ' + lastName,
            class: subject?.class?.name
        }
        return simplifiedSubject
    })
};

const createSubject = async (data) => {
    try {
        const class_id = parseInt(data.class_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);

        const subject = await prisma.subject.create({
            data: {
                name: data.subject, // Assuming 'subject' field exists
                class_id: class_id,
                teacher_id: teacher_id,
            },
        });

        return subject;
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
}

const fetchSubjects = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records

        const searchConditions = searchFor ?
            {
                AND: [
                    baseCondition, 
                    {
                        OR: [
                            { name: { contains: searchFor, mode: 'insensitive' } },
                            {
                                teacher: {
                                    OR: [
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, // Search in teacher's first name
                                        { last_name: { contains: searchFor, mode: 'insensitive' } },  // Search in teacher's last name
                                    ],
                                },
                                class: {
                                    OR: [
                                        { name: { contains: searchFor, mode: 'insensitive' } }, 
                                    ]
                                }
                            },

                        ],
                    }
                ],
            }
        : baseCondition; 

        const [data, totalRows] = await prisma.$transaction([
            prisma.subject.findMany({
                where: searchConditions,
                include: {
                    teacher: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
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
            prisma.subject.count(
                { where: searchConditions }
            )
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            subjects: simplifiedSubjects(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

const updateSubject = async (subjectId, data) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: subjectId },
        });
        
        if (!subject) {
            throw('Subject Not Exist in the Database.')
        }

        const class_id = parseInt(data.class_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);

        // 2. Soft delete the subject
        const updatedSubject =  await prisma.subject.update({
            where: { id: subjectId },
            data: {
                name: data.subject, // Assuming 'subject' field exists
                class_id: class_id,
                teacher_id: teacher_id,
            },
        });
    
        return updatedSubject;
    } catch (error) {
        console.error('Errro in updating subject : ', error);
        throw(error)
    }
}

const deleteSubject = async (subjectId) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: subjectId },
        });
        
        if (!subject) {
            throw('Subject Not Exist in the Database.')
        }

        const now = new Date();

        // 2. Soft delete the subject
        const deletedSubject =  await prisma.subject.update({
            where: { id: subjectId },
            data: { deleted_at: now },
        });
    
        return deletedSubject;
    } catch (error) {
        console.error('Errro in deleting subject : ', error);
        throw(error)
    }
}

module.exports = {
    createSubject,
    fetchSubjects,
    updateSubject,
    deleteSubject
}