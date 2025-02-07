import { NextResponse } from "next/server";
import { createAttendance, fetchAttendances } from "./services";
import { success, failure } from "@/utils/responseHandler";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdAttendance = await createAttendance(data)
        return NextResponse.json(success(createdAttendance, "Attendance Created Successfully!"));
    } catch (error) {
        console.log("Error:",error)
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

    const fetchedAttendances = await fetchAttendances(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedAttendances, "Attendances Fetched!"));
}