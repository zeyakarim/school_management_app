import prisma from "@/config/database";

const { NextResponse } = require("next/server");

export async function GET(req) {
    try {
        const classes = await prisma.class.findMany();
        return NextResponse.json({data: { classes }, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function POST(req) {
    const data = await req.json();
    try {
        const classCreated = await prisma.class.create({
            data: data
        });
        return NextResponse.json({data: {class: classCreated, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}