import prisma from "@/config/database";
import { fetchIcons } from "@/utils/helper";
import { NextResponse } from "next/server";
import { deleteTeacher, updateTeacher } from "../services";
import { failure, success } from "@/utils/responseHandler";
import { readDocumentsFromS3 } from "@/utils/s3";
const bucketName = process.env.AWS_S3_BUCKET;

export async function GET(req, { params }) {
    try {
        const teacherDetails = await prisma.teacher.findUnique({
            where: {id: parseInt(params?.id)}
        });
        const teacherDetailsItems = await fetchIcons();

        const attachDocsUrl = await readDocumentsFromS3('teachers', teacherDetails?.id, bucketName);
        if (attachDocsUrl) teacherDetails['img'] = attachDocsUrl?.[0] || null;

        const data = {
            ...teacherDetails,
            detailsItems: teacherDetailsItems
        }
        return NextResponse.json(success(data, 'Teacher Details Fetched Successfully'));
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