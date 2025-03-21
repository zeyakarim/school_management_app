import prisma from "@/config/database";
import { fetchIcons } from "@/utils/helper";
import { NextResponse } from "next/server";
import { deleteTeacher, updateTeacher } from "../services";
import { failure, success } from "@/utils/responseHandler";
import { readDocumentsFromS3 } from "@/utils/s3";

const bucketName = process.env.AWS_S3_BUCKET;

import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// export async function GET(req, res) {
//     try {
//         const result = await s3.listBuckets().promise();
//         console.log("S3 Buckets:", result);
//         return res.json({ success: true, buckets: result.Buckets });
//     } catch (error) {
//         console.error("S3 Access Error:", error);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }


export async function GET(req, { params }) {
    try {
        // const teacherDetails = await prisma.teacher.findUnique({
        //     where: {id: parseInt(params?.id)}
        // });
        // // const teacherDetailsItems = await fetchIcons();

        // const attachDocsUrl = await readDocumentsFromS3('teachers', teacherDetails?.id, bucketName);
        // console.log(attachDocsUrl,'attachDocsUrl')
        // if (attachDocsUrl) teacherDetails['img'] = attachDocsUrl?.[0] || null;

        // const data = {
        //     ...teacherDetails,
        //     // detailsItems: studentDetailsItems
        // }

        // return NextResponse.json(success(data, 'Teacher Details Fetched Successfully'));
        const result = await s3.listBuckets().promise();
        console.log("S3 Buckets:", result);
        return res.json({ success: true, buckets: result.Buckets });
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