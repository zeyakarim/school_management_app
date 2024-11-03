import { NextResponse } from "next/server";
import prisma from "@/config/database";

export async function POST(req) {
    const data = await req.json();
    try {
        const lesson = await prisma.lesson.create({
            data: data
        });
        return NextResponse.json({data: {lesson: lesson, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

const simplifiedLessons = (lessons) => {
    return lessons?.map((lesson) => {
        const lastName = lesson?.teacher?.last_name ? lesson?.teacher?.last_name : '';
        const simplifiedLesson = {
            ...lesson,
            teacher: lesson?.teacher?.first_name + ' ' + lastName,
            class: lesson?.class?.name,
            subject: lesson?.subject?.name
        }
        return simplifiedLesson
    })
}

export async function GET(req) {
    try {
        const lessons = await prisma.lesson.findMany({
            include: {
                class: {
                    select: {
                        name: true
                    }
                },
                teacher: {
                    select: {
                        first_name: true,
                        last_name: true
                    },
                },
                subject: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return NextResponse.json({data: {lessons: simplifiedLessons(lessons), maxPage: 1, page: 1, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}