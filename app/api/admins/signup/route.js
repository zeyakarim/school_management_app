import { failure, success } from "@/utils/responseHandler";
import { createAdmin } from "../services";
const { NextResponse } = require("next/server");

export async function POST(req) {
    const data = await req.json();
    try {
        const createdAdmin = await createAdmin(data);
        return NextResponse.json(success(createdAdmin, "Admin Created Successfully!"));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}