import { NextResponse } from "next/server";
import { deleteAttendance } from "../services";
import { failure, success } from "@/utils/responseHandler";

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