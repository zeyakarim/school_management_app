import prisma from "@/config/database";
import { fetchStudents } from "./services";
import { success } from "@/utils/responseHandler";
import { putSingleDocumentS3 } from "@/utils/s3";
const { NextResponse } = require("next/server");
const bucketName = process.env.AWS_S3_BUCKET

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file"); // Extract file
        const mimeType = file.type;

        const data = {};
        formData.forEach((value, key) => {
            if (key !== "file" && key !== "class" && key !== "parent") { // Skip the file key
                data[key] = value.trim() === "" ? null : value; // Handle empty strings
            }
        });

        data["class_id"] = 1;
        data["parent_id"] = 1;

        console.log("Parsed Data:", data);

        const student = await prisma.student.create({
            data: data,
        });

        const fileUrl = await putSingleDocumentS3("students", student.id, file, bucketName, mimeType);

        const updatedStudent = await prisma.student.update({
            where: { id: student.id },
            data: { img: fileUrl },
        });

        return NextResponse.json({ data: { student: updatedStudent, status: 200 } });
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json({"msg": "something went wrong"},  {status:'400'})
    }
}

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    // Convert all query parameters into an object
    const queryParams = Object.fromEntries(searchParams?.entries());

    let { page = 1, limit, searchFor = '' } = queryParams;
    limit = limit ? parseInt(limit) :10
    const skipRecord = (page - 1) * limit;

    const fetchedStudents = await fetchStudents(searchFor, page, limit, skipRecord);
    return NextResponse.json(success(fetchedStudents, "Students Fetched Successfully!"));
}