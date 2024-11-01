import prisma from "@/config/database";

const { NextResponse } = require("next/server");

export async function GET (req) {
    try {
        const admins = await prisma.admin.findMany();
        return NextResponse.json({data: admins}, { status: 200 });
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}