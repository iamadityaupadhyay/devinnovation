import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            
            
            trim: true,
            lowercase: true,
        },
        emailHR: {
            type: String,
            
            
            trim: true,
            lowercase: true,
        },
        phoneNumber: {
            type: String,
            
            
        },
        whatsapp: {
            type: String,
            
            
        },
        address: {
            type: String,
            
            trim: true,
        },
        linkedin: {
            type: String,
        
            trim: true,
            lowercase: true,
        },
        facebook: {
            type: String,
            trim: true,
            lowercase: true,
        },
        instagram: {
            type: String,
            trim: true,
            lowercase: true,
        },
        twitter: {
            type: String,
            trim: true,
            lowercase: true,
        },
        youtube: {
            type: String,
            trim: true,
            lowercase: true,
        },
        

    },
    { timestamps: true }
    
)
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;