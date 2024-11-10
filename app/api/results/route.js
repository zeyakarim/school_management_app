import { NextResponse } from "next/server";
import prisma, { assignment } from "@/config/database";

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

const simplifiedResults = (results) => {
    return results?.map((result) => {
        const lastName = result?.student?.last_name ? result?.student?.last_name : '';
        const simplifiedResult = {
            ...result,
            student: result?.student?.first_name + ' ' + lastName,
            exam: result?.exam?.title,
            grade: result?.grade?.level,
            assignment: result?.assignment?.title
        }
        return simplifiedResult
    })
}

export async function GET(req) {
    try {
        const results = await prisma.result.findMany({
            include: {
                student: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                },
                exam: {
                    select: {
                        title: true,
                    }
                },
                grade: {
                    select: {
                        level: true
                    }
                },
                assignment: {
                    select: {
                        title: true
                    }
                }
            }
        });
        return NextResponse.json({data: {results: simplifiedResults(results), status: 200, maxPage: 1, page: 1}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}