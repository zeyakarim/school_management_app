import { NextResponse } from "next/server";
import { deleteStudent } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const studentId = parseInt(params?.id);

        const deletedStudent = await deleteStudent(studentId);
        
        return NextResponse.json(success(deletedStudent, 'Student Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}