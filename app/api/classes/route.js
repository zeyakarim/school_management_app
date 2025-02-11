import { failure, success } from "@/utils/responseHandler";
import { createClass, fetchClasses } from "./services";
const { NextResponse } = require("next/server");

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const searchFor = searchParams.get("searchFor") || '';

    // Calculate the number of items to skip
    const skipRecord = (page - 1) * limit;

    const fetchedClasses = await fetchClasses(searchFor, page, limit, skipRecord); 
    return NextResponse.json(success(fetchedClasses, "Classes Fetched!"));
}

export async function POST(req) {
    const data = await req.json();
    try {
        const createdClass = await createClass(data);
        return NextResponse.json(success(createdClass, 'Class Created Successfully.'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}