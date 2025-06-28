import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      
    },
    image: {
      type: String,
      required: true,
    },
    bulletPoints: {
        type: [String],
        required: true,
    },
    
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;