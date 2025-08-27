import { dbConnect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const collection = await dbConnect("first_data");
        const result = collection.findOne({ _id: new ObjectId(id) });
        if (!result) {
            return NextResponse.json({ error: "Data not found" }, { status: 404 })
        }
        return NextResponse.json(result)
    }
    catch (error) {
        console.log(error);
    }
}