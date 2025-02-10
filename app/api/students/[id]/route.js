import { NextResponse } from "next/server";
import { deleteStudent, updateStudent } from "../services";
import { failure, success } from "@/utils/responseHandler";

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