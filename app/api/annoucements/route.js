import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const annoucement = await prisma.annoucement.create({
            data: data
        });
        return NextResponse.json({data: {annoucement: annoucement, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

const simplifiedAnnoucements = (annoucements) => {
    return annoucements?.map((annoucement) => {
        const simplifiedAnnoucement = {
            ...annoucement,
            class: annoucement?.class?.name
        }
        return simplifiedAnnoucement
    })
}

export async function GET(req) {
    try {
        const annoucements = await prisma.annoucement.findMany({
            include: {
                class: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return NextResponse.json({data: {annoucements: simplifiedAnnoucements(annoucements), status: 200, maxPage: 1, page: 1 }});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}