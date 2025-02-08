import { NextResponse } from "next/server";
import { deleteClass } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const classId = parseInt(params?.id);

        const deletedClass = await deleteClass(classId);
        
        return NextResponse.json(success(deletedClass, 'Class Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}