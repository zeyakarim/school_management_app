import { NextResponse } from "next/server";
import { createAssignment, fetchAssignments } from "./services";
import { failure, success } from "@/utils/responseHandler";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdAssignment = await createAssignment(data)
        return NextResponse.json(success(createdAssignment, "Assignment Created Successfully!"));
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

    const fetchedAssignments = await fetchAssignments(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedAssignments, "Assignments Fetched!"));
}