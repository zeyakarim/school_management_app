import { NextResponse } from "next/server";
import { createAnnouncement, fetchAnnoucements } from "./services";
import { success, failure } from "@/utils/responseHandler";

export async function POST(req) {
    const data = await req.json();
    try {
        const createdAnnouncement = await createAnnouncement(data);
        return NextResponse.json(success(createdAnnouncement, "Annoucement Created Successfully!"));
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
    const fetchedAnnoucements = await fetchAnnoucements(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedAnnoucements, "Annoucements Fetched!"));
}