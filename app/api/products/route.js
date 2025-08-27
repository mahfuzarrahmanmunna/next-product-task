import { dbConnect } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const postedData = await req.json();
        const collection = await dbConnect("first_data");
        const result = await collection.insertOne(postedData);

        return NextResponse.json(
            {
                success: true,
                message: "Data inserted successfully",
                data: { insertedId: result.insertedId },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("DB Insert Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to insert data",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
