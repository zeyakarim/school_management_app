import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const formData = await req.formData();
    try {
        const data = {};
        formData.forEach((value, key) => { data[key] = value });
        const teacher = await prisma.teacher.create({
            data: data
        });
        return NextResponse.json({data: {teacher: teacher, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}


export async function GET(req) {
    try {
        const teachers = await prisma.teacher.findMany();
        return NextResponse.json({data: {teachers, status: 200, maxPage: 1, page: 1 }});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}