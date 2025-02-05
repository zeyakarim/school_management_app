import { NextResponse } from "next/server";
import { createLesson, fetchLessons } from "./services";
import { success } from "@/utils/responseHandler";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdLesson = await createLesson(data);
        return NextResponse.json({data: {lesson: createdLesson, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong", error: error},  {status:'400'})
    }
}

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    // Convert all query parameters into an object
    const queryParams = Object.fromEntries(searchParams?.entries());

    let { page = 1, limit, searchFor = '' } = queryParams;
    limit = limit ? parseInt(limit) :10
    const skipRecord = (page - 1) * limit;

    const fetchedLessons = await fetchLessons(searchFor, page, limit, skipRecord);
    return NextResponse.json(success(fetchedLessons, "Lessons Fetched Successfully!"));
}