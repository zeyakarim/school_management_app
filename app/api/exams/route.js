import { NextResponse } from "next/server";
import { createExam, fetchExams } from "./services";
import { failure, success } from "@/utils/responseHandler";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdExam = await createExam(data)
        return NextResponse.json(success(createdExam, "Exam Created Successfully!"));
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

    const fetchedExams = await fetchExams(searchFor, page, limit, skipRecord);
    return NextResponse.json(success(fetchedExams, "Exams Fetched Successfully!"));
}