import { collectionsNameObj, dbConnect } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
    try {
        const productCollection = await dbConnect(collectionsNameObj().productCollection);
        const data = await productCollection.find().toArray();

        return NextResponse.json(Array.isArray(data) ? data : []);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { message: "Failed to fetch data", error: true },
            { status: 500 }
        );
    }
}

// POST a new product
export async function POST(req) {
    try {
        const postedData = await req.json();

        if (!postedData.name || !postedData.price) {
            return NextResponse.json(
                { success: false, message: "Name and price are required" },
                { status: 400 }
            );
        }

        const productCollection = await dbConnect(collectionsNameObj().productCollection);
        const result = await productCollection.insertOne(postedData);

        return NextResponse.json(
            {
                success: true,
                message: "Product inserted successfully",
                data: { insertedId: result.insertedId },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("DB Insert Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to insert product", error: error.message },
            { status: 500 }
        );
    }
}
