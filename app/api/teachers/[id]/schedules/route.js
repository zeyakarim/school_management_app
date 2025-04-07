import { NextResponse } from "next/server";
import { failure, success } from "@/utils/responseHandler";
import { createTeacherSchedule, fetchTeacherSchedules } from "./services";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdTeacherSchedule = await createTeacherSchedule(data)
        return NextResponse.json(success(createdTeacherSchedule, "Teacher Schedule Created Successfully!"));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function GET(req, { params }) {
    try {
        const fetchedTeacherSchedules = await fetchTeacherSchedules(parseInt(params?.id))
        return NextResponse.json(success(fetchedTeacherSchedules, 'Teacher Schedules Fetched Successfully'));
    } catch (error) {
        console.error("Error fetching teacher:", error);
        return NextResponse.json(failure(error, error?.message));
    }
}