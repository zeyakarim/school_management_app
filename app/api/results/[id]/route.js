import { NextResponse } from "next/server";
import { deleteResult, updateResult } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const resultId = parseInt(params?.id);

        const updatedResult = await updateResult(resultId, data);
        
        return NextResponse.json(success(updatedResult, 'Result Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const resultId = parseInt(params?.id);

        const deletedResult = await deleteResult(resultId);
        
        return NextResponse.json(success(deletedResult, 'Result Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}