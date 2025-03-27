import prisma from "@/config/database";
import { success } from "@/utils/responseHandler";
import { NextResponse } from "next/server";

export async function GET(req) {
    const fetchedAnnoucementsCount = await prisma.annoucement.count();
    return NextResponse.json(success(fetchedAnnoucementsCount, "Annoucements Count Fetched!"));
}