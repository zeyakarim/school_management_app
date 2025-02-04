import prisma from "@/config/database";
import { fetchIcons } from "@/utils/helper";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const teacherDetails = await prisma.teacher.findUnique({
            where: {id: parseInt(params?.id)}
        });
        const teacherDetailsItems = await fetchIcons();

        const data = {
            ...teacherDetails,
            detailsItems: teacherDetailsItems
        }
        return NextResponse.json({data: {teacherDetails: data, status: 200 }});
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}