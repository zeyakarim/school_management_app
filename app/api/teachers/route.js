import { NextResponse } from "next/server";
import { createTeacher, fetchTeachers } from "./services";
import { failure, success } from "@/utils/responseHandler";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // Extract file

        const createdTeacher = await createTeacher(formData, file);
        return NextResponse.json(success(createdTeacher, 'Teacher Created Successfully!'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    // Convert all query parameters into an object
    const queryParams = Object.fromEntries(searchParams?.entries());

    let { page = 1, limit, searchFor = '' } = queryParams;
    limit = limit ? parseInt(limit) :10
    const skipRecord = (page - 1) * limit;

    const fetchedTeachers = await fetchTeachers(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedTeachers, "Teachers Fetched!"));
}