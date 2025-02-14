import { NextResponse } from "next/server";
import { deleteAttendance, updateAttendance } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const attendanceId = parseInt(params?.id);

        const updatedAttendance = await updateAttendance(attendanceId, data);
        
        return NextResponse.json(success(updatedAttendance, 'Attendance Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const attendanceId = parseInt(params?.id);

        const deletedAttendance = await deleteAttendance(attendanceId);
        
        return NextResponse.json(success(deletedAttendance, 'Attendance Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}