import { createParent, fetchParents } from "./services";
import { failure, success } from "@/utils/responseHandler";
const { NextResponse } = require("next/server");

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    // Convert all query parameters into an object
    const queryParams = Object.fromEntries(searchParams?.entries());

    let { page = 1, limit, searchFor = '' } = queryParams;
    limit = limit ? parseInt(limit) :10
    const skipRecord = (page - 1) * limit;

    const fetchedParents = await fetchParents(searchFor, page, limit, skipRecord);
    return NextResponse.json(success(fetchedParents, "Parents Fetched Successfully!"));
}

export async function POST(req) {
    const data = await req.json();
    try {
        const createdParent = await createParent(data);
        return NextResponse.json(success(createdParent, "Parent Created Successfully!"));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}