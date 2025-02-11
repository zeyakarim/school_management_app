import { NextResponse } from "next/server";
import { deleteSubject, updateSubject } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const subjectId = parseInt(params?.id);

        const updatedSubject = await updateSubject(subjectId, data);
        
        return NextResponse.json(success(updatedSubject, 'Subject Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const subjectId = parseInt(params?.id);

        const deletedSubject = await deleteSubject(subjectId);
        
        return NextResponse.json(success(deletedSubject, 'Subject Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}