import prisma from "@/config/database";

const { NextResponse } = require("next/server");

export async function GET(req) {
    try {
        const subjects = await prisma.subject.findMany();
        return NextResponse.json({data: {subjects}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function POST(req) {
    const data = await req.json();
    try {
        const subject = await prisma.subject.create({
            data: data
        });
        return NextResponse.json({data: {subject: subject, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}