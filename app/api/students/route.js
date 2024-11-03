import prisma from "@/config/database";
const { NextResponse } = require("next/server");

export async function POST(req) {
    const formData = await req.formData();
    try {
        const data = {};
        formData.forEach((value, key) => {
            if (key === 'parent_id' || key === 'class_id' || key === 'grade_id') {
                data[key] = parseInt(value);
            } else {
                data[key] = value ;
            }
        });
        const student = await prisma.student.create({
            data: data
        });
        return NextResponse.json({data: {student: student, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

const simplifiedStudents = (students) => {
    return students?.map((student) => {
        const simplifiedStudent = {
            ...student,
            parent: student?.parent?.first_name + ' ' + student?.parent?.last_name,
            class: student?.class?.name,
        }
        return simplifiedStudent
    })
}

export async function GET(req) {
    try {
        const students = await prisma.student.findMany({
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
        });
        
        return NextResponse.json({data: {students: simplifiedStudents(students), status: 200, maxPage: 1, page: 1}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}