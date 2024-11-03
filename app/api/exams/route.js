import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const exam = await prisma.exam.create({
            data: data
        });
        return NextResponse.json({data: {exam: exam, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

const simplifiedExams = (exams) => {
    return exams?.map((exam) => {
        const simplifiedExam = {
            ...exam,
            class: exam?.class?.name,
            subject: exam?.subject?.name
        }
        return simplifiedExam
    })
}

export async function GET(req) {
    try {
        const exams = await prisma.exam.findMany({
            include: {
                class: {
                    select: {
                        name: true
                    }
                },
                subject: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return NextResponse.json({data: {exams: simplifiedExams(exams), maxPage: 1, page: 1, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}