import prisma from "@/config/database";
import { fetchStudents } from "./services";
import { success } from "@/utils/responseHandler";
const { NextResponse } = require("next/server");

export async function POST(req) {
    const formData = await req.formData();
    try {
        const data = {};
        formData.forEach((value, key) => {
            if (key === 'parent_id' || key === 'class_id' || key === 'grade_id') {
                data[key] = parseInt(value);
            } else {
                data[key] = value ;
            }
        });
        const student = await prisma.student.create({
            data: data
        });
        return NextResponse.json({data: {student: student, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    // Convert all query parameters into an object
    const queryParams = Object.fromEntries(searchParams?.entries());

    let { page = 1, limit, searchFor = '' } = queryParams;
    limit = limit ? parseInt(limit) :10
    const skipRecord = (page - 1) * limit;

    const fetchedStudents = await fetchStudents(searchFor, page, limit, skipRecord);
    return NextResponse.json(success(fetchedStudents, "Students Fetched Successfully!"));
}