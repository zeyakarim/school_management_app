import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const exams = await prisma.exam.findMany({
            select: {
                id: true,
                title: true
            }
        }); // Fetch all records
        return NextResponse.json({ success: true, data: exams, message: "All exams Fetched!" });
    } catch (error) {
        console.error("Error fetching all exams:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch exams", error }, { status: 500 });
    }
}