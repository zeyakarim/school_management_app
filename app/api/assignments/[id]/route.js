import { NextResponse } from "next/server";
import { deleteAssignment } from "../services";
import { failure, success } from "@/utils/responseHandler";

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