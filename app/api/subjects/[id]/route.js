import { NextResponse } from "next/server";
import { deleteSubject } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const subjectId = parseInt(params?.id);

        const deletedSubject = await deleteSubject(subjectId);
        
        return NextResponse.json(success(deletedSubject, 'Subject Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}