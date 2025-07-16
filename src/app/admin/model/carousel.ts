
import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            
        },
        image1: {
            type: String,
            required: true,
        },
        image2:{
            type: String,
            required: true,
        }
    }
)
const Carousel = mongoose.models.Carousel || mongoose.model("Carousel", carouselSchema);
export default Carousel;
