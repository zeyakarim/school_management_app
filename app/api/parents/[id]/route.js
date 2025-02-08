import { NextResponse } from "next/server";
import { deleteParent } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const parentId = parseInt(params?.id);

        const deletedParent = await deleteParent(parentId);
        
        return NextResponse.json(success(deletedParent, 'Parent Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}