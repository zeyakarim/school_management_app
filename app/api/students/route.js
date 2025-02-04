import { createStudent, fetchStudents } from "./services";
import { success } from "@/utils/responseHandler";
const { NextResponse } = require("next/server");

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // Extract file

        const createdStudent = await createStudent(formData, file);
        return NextResponse.json({ data: { student: createdStudent, status: 200 } });
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