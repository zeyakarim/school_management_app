import { NextResponse } from "next/server";
import { deleteGrade, updateGrade } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const gradeId = parseInt(params?.id);

        const updatedGrade = await updateGrade(gradeId, data);
        
        return NextResponse.json(success(updatedGrade, 'Grade Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

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