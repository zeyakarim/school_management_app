import { NextResponse } from "next/server";
import { deleteAssignment, updateAssignment } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const assignmentId = parseInt(params?.id);

        const updatedAssignment = await updateAssignment(assignmentId, data);
        
        return NextResponse.json(success(updatedAssignment, 'Assignment Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const assignmentId = parseInt(params?.id);

        const deletedAssignment= await deleteAssignment(assignmentId);
        
        return NextResponse.json(success(deletedAssignment, 'Assignment Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}