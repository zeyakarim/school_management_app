import { NextResponse } from "next/server";
import { deleteLesson } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const lessonId = parseInt(params?.id);

        const deletedLesson = await deleteLesson(lessonId);
        
        return NextResponse.json(success(deletedLesson, 'Lesson Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}