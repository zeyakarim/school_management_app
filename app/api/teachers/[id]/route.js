import prisma from "@/config/database";
import { fetchIcons } from "@/utils/helper";
import { NextResponse } from "next/server";
import { deleteTeacher, updateTeacher } from "../services";
import { failure, success } from "@/utils/responseHandler";

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

export async function PUT(req, { params }) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // Extract file

        const teacherId = parseInt(params?.id);

        const updatedTeacher = await updateTeacher(teacherId, formData, file);
        
        return NextResponse.json(success(updatedTeacher, 'Teacher Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const teacherId = parseInt(params?.id);

        const deletedTeacher = await deleteTeacher(teacherId);
        
        return NextResponse.json(success(deletedTeacher, 'Teacher Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}