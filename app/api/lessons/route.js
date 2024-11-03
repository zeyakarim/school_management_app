import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const lesson = await prisma.lesson.create({
            data: data
        });
        return NextResponse.json({data: {lesson: lesson, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}


export async function GET(req) {
    try {
        const lessons = await prisma.lesson.findMany();
        return NextResponse.json({data: {lessons}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}