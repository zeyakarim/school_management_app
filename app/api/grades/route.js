import prisma from "@/config/database";
import { fetchGrades } from "./services";
import { success } from "@/utils/responseHandler";
const { NextResponse } = require("next/server");

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    // Convert all query parameters into an object
    const queryParams = Object.fromEntries(searchParams?.entries());

    let { page = 1, limit, searchFor = '' } = queryParams;
    limit = limit ? parseInt(limit) :10
    const skipRecord = (page - 1) * limit;

    const fetchedGrades = await fetchGrades(searchFor, page, limit, skipRecord);
    return NextResponse.json(success(fetchedGrades, "Grades Fetched Successfully!"));
}

export async function POST(req) {
    const data = await req.json();
    try {
        const grade = await prisma.grade.create({
            data: data
        });
        return NextResponse.json({data: {grade: grade, status: 200}});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}