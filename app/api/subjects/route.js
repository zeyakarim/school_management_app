import prisma from "@/config/database";

const { NextResponse } = require("next/server");

const simplifiedSubjects = (subjects) => {
    return subjects?.map((subject) => {
        const lastName = subject?.teacher?.last_name ? subject?.teacher?.last_name : '';
        const simplifiedSubject = {
            ...subject,
            teacher: subject?.teacher?.first_name + ' ' + lastName
        }
        return simplifiedSubject
    })
}

export async function GET(req) {
    try {
        const subjects = await prisma.subject.findMany({
            include: {
                teacher: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                }
            }
        });
        return NextResponse.json({data: {subjects: simplifiedSubjects(subjects), status: 200, maxPage: 1, page: 1}});
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