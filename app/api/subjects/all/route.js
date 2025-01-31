import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const subjects = await prisma.subject.findMany(
            {
                select: {
                    id: true,
                    name: true
                }
            }
        ); // Fetch all records
        return NextResponse.json({ success: true, data: subjects, message: "All Subjects Fetched!" });
    } catch (error) {
        console.error("Error fetching all subjects:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch subjects", error }, { status: 500 });
    }
}