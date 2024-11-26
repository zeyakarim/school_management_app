import prisma from "@/config/database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const teacherDetails = await prisma.teacher.findUnique({
            where: {id: parseInt(params?.id)}
        });
        return NextResponse.json({data: {teacherDetails: teacherDetails, status: 200 }});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}