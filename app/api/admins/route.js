import prisma from "@/config/database";
import { failure, success } from "@/utils/responseHandler";
const { NextResponse } = require("next/server");

export async function GET (req) {
    try {
        const admins = await prisma.admin.findMany();
        return NextResponse.json(success(admins, 'Admins Fetched Successfully!'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}