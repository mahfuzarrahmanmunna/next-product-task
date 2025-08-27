import { dbConnect } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const collection = await dbConnect("first_data");

        // Await the findOne result
        const result = await collection.findOne({ _id: new ObjectId(id) });
        console.log(result);

        if (!result) {
            return NextResponse.json({ error: "Data not found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
