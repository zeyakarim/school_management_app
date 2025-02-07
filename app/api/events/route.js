import { NextResponse } from "next/server";
import { success, failure } from "@/utils/responseHandler";
import { createEvent, fetchEvents } from "./services";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdEvent = await createEvent(data)
        return NextResponse.json(success(createdEvent, "Event Created Successfully!"));
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

    const fetchedEvents = await fetchEvents(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedEvents, "Events Fetched Successfully!"));
}