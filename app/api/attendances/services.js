import prisma from "@/config/database";
import { handlePrismaError } from "@/utils/prismaErrorHandler";

const simplifiedAttendances = (attendances) => {
    return attendances?.map((attendance) => {
        const lastName = attendance?.student?.last_name ? attendance?.student?.last_name : '';
        const lastTeacherName = attendance?.teacher?.last_name ? attendance?.teacher?.last_name : '';
        const simplifiedAttendance = {
            ...attendance,
            student: attendance?.student?.first_name + ' ' + lastName,
            teacher: attendance?.teacher?.first_name + ' ' + lastTeacherName,
            class: attendance?.class?.name,
            lesson: attendance?.lesson?.name
        }
        return simplifiedAttendance
    })
}

const createAttendance = async (data) => {
    try {
        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);
        const lesson_id = parseInt(data.lesson_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);
        const student_id = parseInt(data.student_id, 10);
        const present = data?.present === 'TRUE' ? true : false;

        const createdAttendance = await prisma.attendance.create({
            data: {
                present: present,
                date: data?.date,
                student_id: student_id,
                lesson_id: lesson_id,
                subject_id: subject_id,
                class_id: class_id,
                teacher_id: teacher_id
            }
        });
        
        return createdAttendance;
    } catch (error) {
        handlePrismaError(error);
    }
}

const fetchAttendances = async (searchFor, page, limit, skipRecord) => {
    try {
        const baseCondition = { deleted_at: null }; // Always exclude soft-deleted records

        const searchConditions = searchFor ? 
            {
                AND: [
                    baseCondition,
                    {
                        OR: [
                            // { name: { contains: searchFor, mode: 'insensitive' } },
                            {
                                student: {
                                    OR: [
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, // Search in teacher's first name
                                        { last_name: { contains: searchFor, mode: 'insensitive' } },  // Search in teacher's last name
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
                            {
                                lesson: {
                                    OR: [
                                        { name: { contains: searchFor, mode: 'insensitive' } },
                                    ],
                                },
                            },
                            {
                                teacher: {
                                    OR: [
                                        { first_name: { contains: searchFor, mode: 'insensitive' } }, // Search in teacher's first name
                                        { last_name: { contains: searchFor, mode: 'insensitive' } },  // Search in teacher's last name
                                    ],
                                },
                            }
                        ],
                    }    
                ]
            }
        : baseCondition;
        
        const [data, totalRows] = await prisma.$transaction([
            prisma.attendance.findMany({
                where: searchConditions,
                include: {
                    student: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    },
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
                    },
                    lesson: {
                        select: {
                            name: true
                        }
                    }
                },
                skip: skipRecord,    // Number of records to skip
                take: limit,         // Number of records to fetch
                orderBy: { created_at: 'desc' }, // Optional: Order results
            }),
            prisma.attendance.count({
                where: searchConditions
            })
        ]);

        const maxPage = Math.ceil(totalRows / limit);

        return { 
            attendances: simplifiedAttendances(data), 
            maxPage: maxPage, 
            page: page, 
            totalRows:totalRows 
        }
    } catch (error) {
        console.log("Error:",error)
        throw(error)
    }
};

const updateAttendance = async (attendanceId, data) => {
    try {
        const attendance = await prisma.attendance.findUnique({
            where: { id: attendanceId },
        });
        
        if (!attendance) {
            throw { message: 'Attendance Not Exist in the Database.' }
        }

        const subject_id = parseInt(data.subject_id, 10);
        const class_id = parseInt(data.class_id, 10);
        const lesson_id = parseInt(data.lesson_id, 10);
        const teacher_id = parseInt(data.teacher_id, 10);
        const student_id = parseInt(data.student_id, 10);
        const present = data?.present === 'TRUE' ? true : false;

        const updatedAttendance =  await prisma.attendance.update({
            where: { id: attendanceId },
            data: {
                present: present,
                date: data?.date,
                student_id: student_id,
                lesson_id: lesson_id,
                subject_id: subject_id,
                class_id: class_id,
                teacher_id: teacher_id
            }
        });
    
        return updatedAttendance;
    } catch (error) {
        handlePrismaError(error);
    }
}

const deleteAttendance = async (attendanceId) => {
    try {
        const attendance = await prisma.attendance.findUnique({
            where: { id: attendanceId },
        });
        
        if (!attendance) {
            throw { message: 'Attendance Not Exist in the Database.' }
        }

        const now = new Date();

        // 2. Soft delete the Attendance
        const deletedAttendance =  await prisma.attendance.update({
            where: { id: attendanceId },
            data: { deleted_at: now },
        });
    
        return deletedAttendance;
    } catch (error) {
        handlePrismaError(error);
    }
}

module.exports = {
    createAttendance,
    fetchAttendances,
    updateAttendance,
    deleteAttendance
}