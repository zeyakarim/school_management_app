import prisma from "@/config/database";

const { NextResponse } = require("next/server");

export async function GET(req) {
    try {
        const students = await prisma.student.findMany();
        return NextResponse.json({data: {students}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

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