import { NextResponse } from "next/server";
import { deleteClass, updateClass } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const classId = parseInt(params?.id);

        const updatedClass = await updateClass(classId, data);
        
        return NextResponse.json(success(updatedClass, 'Class Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

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