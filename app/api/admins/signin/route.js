import { failure, success } from "@/utils/responseHandler";
import { signInAdmin } from "../services";
const { NextResponse } = require("next/server");

export async function POST(req) {
    const data = await req.json();
    try {
        const signedAdmin = await signInAdmin(data);
        return NextResponse.json(success(signedAdmin, "Admin Signed Successfully!"));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}