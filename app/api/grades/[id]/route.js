import { NextResponse } from "next/server";
import { deleteGrade } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const gradeId = parseInt(params?.id);

        const deletedGrade = await deleteGrade(gradeId);
        
        return NextResponse.json(success(deletedGrade, 'Grade Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}