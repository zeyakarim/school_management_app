import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const classes = await prisma.class.findMany(
            {
                select: {
                    id: true,
                    name: true
                }
            }
        ); // Fetch all records
        return NextResponse.json({ success: true, data: classes, message: "All Classes Fetched!" });
    } catch (error) {
        console.error("Error fetching all classes:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch classes", error }, { status: 500 });
    }
}