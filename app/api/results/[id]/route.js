import { NextResponse } from "next/server";
import { deleteResult } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const resultId = parseInt(params?.id);

        const deletedResult = await deleteResult(resultId);
        
        return NextResponse.json(success(deletedResult, 'Result Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}