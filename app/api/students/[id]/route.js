import { NextResponse } from "next/server";
import { deleteStudent, updateStudent } from "../services";
import { failure, success } from "@/utils/responseHandler";
import { fetchIcons } from "@/utils/helper";
import { readDocumentsFromS3 } from "@/utils/s3";
import prisma from "@/config/database";
const bucketName = process.env.AWS_S3_BUCKET;

export async function GET(req, { params }) {
    try {
        const studentDetails = await prisma.student.findUnique({
            where: {id: parseInt(params?.id)}
        });
        // const studentDetailsItems = await fetchIcons();

        const attachDocsUrl = await readDocumentsFromS3('students', studentDetails?.id, bucketName);
        if (attachDocsUrl) studentDetails['img'] = attachDocsUrl?.[0] || null;

        const data = {
            ...studentDetails,
            detailsItems: studentDetailsItems
        }

        return NextResponse.json(success(data, 'Student Details Fetched Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function PUT(req, { params }) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // Extract file

        const studentId = parseInt(params?.id);

        const updatedStudent = await updateStudent(studentId, formData, file);
        
        return NextResponse.json(success(updatedStudent, 'Student Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const studentId = parseInt(params?.id);

        const deletedStudent = await deleteStudent(studentId);
        
        return NextResponse.json(success(deletedStudent, 'Student Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}