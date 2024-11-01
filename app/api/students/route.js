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
        formData.forEach((value, key) => { data[key] = value });
        console.log(data,'data')
        // const students = await prisma.student.findMany();
        const teacher = await prisma.teacher.create({
            data: data
        });
        console.log(teacher,'teacher')
        return NextResponse.json({data: {student: 'students', status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}