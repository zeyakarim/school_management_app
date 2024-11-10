import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const assignment = await prisma.assignment.create({
            data: data
        });
        return NextResponse.json({data: {assignment: assignment, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

const simplifiedAssignments = (assignments) => {
    return assignments?.map((assignment) => {
        const lastName = assignment?.teacher?.last_name ? assignment?.teacher?.last_name : '';
        const simplifiedAssignment = {
            ...assignment,
            teacher: assignment?.teacher?.first_name + ' ' + lastName,
            subject: assignment?.subject?.name,
            lesson: assignment?.lesson?.name
        }
        return simplifiedAssignment
    })
}

export async function GET(req) {
    try {
        const assignments = await prisma.assignment.findMany({
            include: {
                teacher: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                },
                subject: {
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
        return NextResponse.json({data: {assignments: simplifiedAssignments(assignments), status: 200, maxPage: 1, page: 1}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}