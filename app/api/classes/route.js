import prisma from "@/config/database";
const { NextResponse } = require("next/server");

const simplifiedClasses = (classes) => {
    return classes?.map((classData) => {
        const lastName = classData?.supervisor?.last_name ? classData?.supervisor?.last_name : '';
        const simplifiedClass = {
            ...classData,
            supervisor: classData?.supervisor?.first_name + ' ' + lastName
        }
        return simplifiedClass
    })
}

export async function GET(req) {
    try {
        const classes = await prisma.class.findMany({
            include: {
                supervisor: {
                    select: {
                        first_name: true,
                        last_name: true
                    }
                }
            }
        });
        return NextResponse.json({data: { classes: simplifiedClasses(classes), maxPage: 1, page: 1, status: 200}});
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