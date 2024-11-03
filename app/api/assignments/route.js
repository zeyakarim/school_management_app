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


export async function GET(req) {
    try {
        const assignments = await prisma.assignment.findMany();
        return NextResponse.json({data: {assignments}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}