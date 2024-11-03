import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const event = await prisma.event.create({
            data: data
        });
        return NextResponse.json({data: {event: event, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}


export async function GET(req) {
    try {
        const events = await prisma.event.findMany();
        return NextResponse.json({data: {events}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}