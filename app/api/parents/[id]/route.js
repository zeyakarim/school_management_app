import { NextResponse } from "next/server";
import { deleteParent, updateParent } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const parentId = parseInt(params?.id);

        const updatedParent = await updateParent(parentId, data);
        
        return NextResponse.json(success(updatedParent, 'Parent Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const parentId = parseInt(params?.id);

        const deletedParent = await deleteParent(parentId);
        
        return NextResponse.json(success(deletedParent, 'Parent Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}