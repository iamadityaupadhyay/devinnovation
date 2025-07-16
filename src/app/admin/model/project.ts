import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    category: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    bulletPoints: {
        type: [String],
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    },
    
    link: {
        type: String,
        
    },

    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
// name: "",
    // category: "",
    // shortDescription: "",
    // bulletPoints: ["", "", "", ""],
    // technologies: [""],
    // description: "",
    // clientName: "",
    // image: "",
    // previewImage: "",
    // link: "",
    // these fileds are required for the project model