import prisma from "@/config/database";

const { NextResponse } = require("next/server");

export async function GET(req) {
    try {
        const grades = await prisma.grade.findMany();
        return NextResponse.json({data: { grades }, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function POST(req) {
    const data = await req.json();
    try {
        const grade = await prisma.grade.create({
            data: data
        });
        return NextResponse.json({data: {grade: grade, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}