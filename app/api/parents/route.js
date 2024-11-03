import prisma from "@/config/database";

const { NextResponse } = require("next/server");

export async function GET(req) {
    try {
        const parents = await prisma.parent.findMany();
        return NextResponse.json({data: {parents, status: 200, maxPage: 1, page: 1}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function POST(req) {
    const data = await req.json();
    try {
        const parent = await prisma.parent.create({
            data: data
        });
        return NextResponse.json({data: {parent: parent, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}