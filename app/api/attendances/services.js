import prisma from "@/config/database";

const simplifiedAttendances = (attendances) => {
    return attendances?.map((attendance) => {
        const lastName = attendance?.student?.last_name ? attendance?.student?.last_name : '';
        const simplifiedAttendance = {
            ...attendance,
            student: attendance?.student?.first_name + ' ' + lastName,
            class: attendance?.class?.name,
            lesson: attendance?.lesson?.name
        }
        return simplifiedAttendance
    })
}

const fetchAttendances = async (searchFor, page, limit, skipRecord) => {
    try {
        const [data, totalRows] = await prisma.$transaction([
            prisma.attendance.findMany({
                include: {
                    student: {
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
            prisma.attendance.count()
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

module.exports = {
    fetchAttendances
}