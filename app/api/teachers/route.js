import { NextResponse } from "next/server";
import prisma from "@/config/database";
import { fetchTeachers } from "./services";
import { success } from "@/utils/responseHandler";

export async function POST(req) {
    const formData = await req.formData();
    try {
        const data = {};
        formData.forEach((value, key) => { data[key] = value });
        const teacher = await prisma.teacher.create({
            data: data
        });
        return NextResponse.json({data: {teacher: teacher, status: 200}});
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

    const fetchedTeachers = await fetchTeachers(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedTeachers, "Teachers Fetched!"));
}