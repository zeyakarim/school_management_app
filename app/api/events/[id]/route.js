import { NextResponse } from "next/server";
import { deleteEvent, updateEvent } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const eventId = parseInt(params?.id);

        const updatedEvent = await updateEvent(eventId, data);
        
        return NextResponse.json(success(updatedEvent, 'Event Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const eventId = parseInt(params?.id);

        const deletedEvent = await deleteEvent(eventId);
        
        return NextResponse.json(success(deletedEvent, 'Event Deleted Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}