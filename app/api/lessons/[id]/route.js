import { NextResponse } from "next/server";
import { deleteLesson, updateLesson } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const lessonId = parseInt(params?.id);

        const updatedLesson = await updateLesson(lessonId, data);
        
        return NextResponse.json(success(updatedLesson, 'Lesson Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const lessonId = parseInt(params?.id);

        const deletedLesson = await deleteLesson(lessonId);
        
        return NextResponse.json(success(deletedLesson, 'Lesson Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}