import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const teachers = await prisma.teacher.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true
            }
        }); // Fetch all records
        return NextResponse.json({ success: true, data: teachers, message: "All Teachers Fetched!" });
    } catch (error) {
        console.error("Error fetching all teachers:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch teachers", error }, { status: 500 });
    }
}