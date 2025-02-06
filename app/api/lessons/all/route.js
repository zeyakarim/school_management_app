import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const lessons = await prisma.lesson.findMany({
            select: {
                id: true,
                name: true
            }
        }); // Fetch all records
        return NextResponse.json({ success: true, data: lessons, message: "All lessons Fetched!" });
    } catch (error) {
        console.error("Error fetching all lessons:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch lessons", error }, { status: 500 });
    }
}