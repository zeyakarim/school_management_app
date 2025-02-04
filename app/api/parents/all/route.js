import { NextResponse } from "next/server";
import prisma from "@/config/database"; // Ensure correct path

export async function GET() {
    try {
        const parents = await prisma.parent.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true
            }
        }); // Fetch all records
        return NextResponse.json({ success: true, data: parents, message: "All Parents Fetched!" });
    } catch (error) {
        console.error("Error fetching all parents:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch parents", error }, { status: 500 });
    }
}