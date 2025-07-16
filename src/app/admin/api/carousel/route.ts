import { NextRequest, NextResponse } from "next/server";
import Carousel from "../../model/carousel";
import connectDB from "@/lib/util";

// post method 
export async function POST(request:NextRequest){
    await connectDB();
    try{
        const data = await request.json();
        const id= data.id;
        const image1 = data.image1;
        const image2 = data.image2;
        const title = data.title;
        console.log("Received data:", { id, image1, image2, title });
        const carousel = await Carousel.findOne({
            title:title
        });
        if (!carousel){
            await Carousel.create({
                title: title,
                image1: image1,
                image2: image2
            });
        }

        carousel.image1 = image1;
        carousel.image2 = image2;
        carousel.title = title;
        await carousel.save();
        return NextResponse.json({ message: "Carousel updated successfully" }, { status: 200 });
    }
    catch(error){
        console.error("Error in POST method:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


// get api 
export async function GET(request: NextRequest) {
    await connectDB();
    try{
        const carousels = await Carousel.find({});
        return NextResponse.json(carousels, { status: 200 });


    }
    catch(error) {
        console.error("Error in GET method:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}