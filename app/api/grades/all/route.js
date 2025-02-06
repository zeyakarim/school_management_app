import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const grades = await prisma.grade.findMany({
            select: {
                id: true,
                level: true
            }
        }); // Fetch all records
        return NextResponse.json({ success: true, data: grades, message: "All grades Fetched!" });
    } catch (error) {
        console.error("Error fetching all grades:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch grades", error }, { status: 500 });
    }
}