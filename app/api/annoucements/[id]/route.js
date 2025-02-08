import { NextResponse } from "next/server";
import { deleteAnnoucement } from "../services";
import { failure, success } from "@/utils/responseHandler";

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