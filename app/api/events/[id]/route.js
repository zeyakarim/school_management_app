import { NextResponse } from "next/server";
import { deleteEvent } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function DELETE(req, { params }) {
    try {
        const eventId = parseInt(params?.id);

        const deletedEvent = await deleteEvent(eventId);
        
        return NextResponse.json(success(deletedEvent, 'Event Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}