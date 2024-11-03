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


export async function GET(req) {
    try {
        const attendances = await prisma.attendance.findMany();
        return NextResponse.json({data: {attendances}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}