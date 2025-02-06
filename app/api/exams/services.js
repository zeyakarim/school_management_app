const prisma = require("@/config/database");

const simplifiedExams = (exams) => {
    return exams?.map((exam) => {
        const simplifiedExam = {
            ...exam,
            class: exam?.class?.name,
            subject: exam?.subject?.name
        }
        return simplifiedExam
    })
}

const createExam = async (data) => {
    try {
        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);

        const createdExam = await prisma.exam.create({
            data: {
                title: data?.title,
                class_id: class_id,
                subject_id: subject_id,
                start_time: data?.start_time,
                end_time: data?.end_time,
                date: data?.date
            }
        });
        
        return createdExam;
    } catch(error) {
        console.error('Error in creating exam : ', error)
        throw(error)
    }
}

const fetchExams = async (searchFor, page, limit, skipRecord) => {
    try {
        const searchConditions = searchFor ? 
            {
                OR: [
                    { title: { contains: searchFor, mode: 'insensitive' } },
                    {
                        class: {
                            OR: [
                                { name: { contains: searchFor, mode: 'insensitive' } },
                            ],
                        },
                    },
                    {
                        subject: {
                            OR: [
                                { name: { contains: searchFor, mode: 'insensitive' } },
                            ],
                        },
                    },
                ],
            }
        : {}; 

        const [data, totalRows] = await prisma.$transaction([
            prisma.exam.findMany({
                where: searchConditions,
                include: {
                    class: {
                        select: {
                            name: true
                        }
                    },
                    subject: {
                        select: {
                            name: true
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.exam.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);
        return { 
            exams: simplifiedExams(data), 
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
    createExam,
    fetchExams
}