import { NextResponse } from "next/server";
import { deleteExam, updateExam } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const examId = parseInt(params?.id);

        const updatedExam = await updateExam(examId, data);
        
        return NextResponse.json(success(updatedExam, 'Exam Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const examId = parseInt(params?.id);

        const deletedExam = await deleteExam(examId);
        
        return NextResponse.json(success(deletedExam, 'Exam Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}