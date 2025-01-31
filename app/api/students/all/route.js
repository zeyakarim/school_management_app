import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const students = await prisma.student.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true
            }
        }); // Fetch all records
        return NextResponse.json({ success: true, data: students, message: "All Students Fetched!" });
    } catch (error) {
        console.error("Error fetching all students:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch students", error }, { status: 500 });
    }
}