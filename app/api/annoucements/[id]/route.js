import { NextResponse } from "next/server";
import { deleteAnnoucement, updateAnnoucement } from "../services";
import { failure, success } from "@/utils/responseHandler";

export async function PUT(req, { params }) {
    try {
        const data = await req.json();

        const annoucementId = parseInt(params?.id);

        const updatedAnnoucement = await updateAnnoucement(annoucementId, data);
        
        return NextResponse.json(success(updatedAnnoucement, 'Annoucement Updated Successfully'));
    } catch (error) {
        return NextResponse.json(failure(error, error?.message))
    }
}

export async function DELETE(req, { params }) {
    try {
        const announcementId = parseInt(params?.id);

        const deletedAnnoucement = await deleteAnnoucement(announcementId);
        
        return NextResponse.json(success(deletedAnnoucement, 'Annoucement Deleted Successfully'));
    } catch (error) {
        console.log("Error:",error)
        return NextResponse.json(failure(error, error?.message))
    }
}