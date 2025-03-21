import prisma from "@/config/database";
import { fetchIcons } from "@/utils/helper";
import { NextResponse } from "next/server";
import { deleteTeacher, updateTeacher } from "../services";
import { failure, success } from "@/utils/responseHandler";
import { readDocumentsFromS3 } from "@/utils/s3";

const bucketName = process.env.AWS_S3_BUCKET;

export async function GET(req, { params }) {
    console.log("Received params: 1111111111111111", params); 
    try {
        console.log("Received params:", params); // Debugging log

        const teacherId = Number(params?.id);
        if (isNaN(teacherId)) {
            return NextResponse.json({ msg: "Invalid teacher ID" }, { status: 400 });
        }

        const teacherDetails = await prisma.teacher.findUnique({
            where: { id: teacherId }
        });

        if (!teacherDetails) {
            return NextResponse.json({ msg: "Teacher not found" }, { status: 404 });
        }

        const teacherDetailsItems = await fetchIcons();

        const attachDocsUrl = await readDocumentsFromS3('teachers', teacherId, bucketName);
        if (attachDocsUrl) teacherDetails['img'] = attachDocsUrl?.[0] || null;

        const data = {
            ...teacherDetails,
            detailsItems: teacherDetailsItems
        };

        return NextResponse.json(success(data, 'Teacher Details Fetched Successfully'));
    } catch (error) {
        console.error("Error fetching teacher:", error);
        return NextResponse.json(failure(error, error?.message));
    }
}

export async function PUT(req, { params }) {
    try {
        console.log("Updating teacher with params:", params); // Debugging log

        const teacherId = Number(params?.id);
        if (isNaN(teacherId)) {
            return NextResponse.json({ msg: "Invalid teacher ID" }, { status: 400 });
        }

        const formData = await req.formData();
        const file = formData.get("file"); // Extract file

        const updatedTeacher = await updateTeacher(teacherId, formData, file);

        return NextResponse.json(success(updatedTeacher, 'Teacher Updated Successfully'));
    } catch (error) {
        console.error("Error updating teacher:", error);
        return NextResponse.json(failure(error, error?.message));
    }
}

export async function DELETE(req, { params }) {
    try {
        console.log("Deleting teacher with params:", params); // Debugging log

        const teacherId = Number(params?.id);
        if (isNaN(teacherId)) {
            return NextResponse.json({ msg: "Invalid teacher ID" }, { status: 400 });
        }

        const deletedTeacher = await deleteTeacher(teacherId);

        return NextResponse.json(success(deletedTeacher, 'Teacher Deleted Successfully'));
    } catch (error) {
        console.error("Error deleting teacher:", error);
        return NextResponse.json(failure(error, error?.message));
    }
}