import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const result = await prisma.result.create({
            data: data
        });
        return NextResponse.json({data: {result: result, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}


export async function GET(req) {
    try {
        const results = await prisma.result.findMany();
        return NextResponse.json({data: {results}, status: 200});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}