import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const attendance = await prisma.attendance.create({
            data: data
        });
        return NextResponse.json({data: {attendance: attendance, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

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

export async function GET(req) {
    try {
        const attendances = await prisma.attendance.findMany({
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
            }
        });
        return NextResponse.json({data: {attendances: simplifiedAttendances(attendances), status: 200, maxPage: 1, page: 1}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}