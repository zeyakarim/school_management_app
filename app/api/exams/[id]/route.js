import { NextResponse } from "next/server";
import { deleteExam } from "../services";
import { failure, success } from "@/utils/responseHandler";

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