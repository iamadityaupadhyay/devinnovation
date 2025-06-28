// app/admin/model/team.js
import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
   
  },
  position: {
    type: String,
    required: [true, 'Designation is required'],
    
  },
  profileImage: {
    type: String,
    required: [true, 'Profile image is required']
  },
  
  awardsCount: {
    type: Number,
    default: 0,
    min: [0, 'Awards count cannot be negative']
  },
  skills: {
    type: [String],
    default: [],
    
  },
  bio: {
    type: String,
    trim: true,
 
      
      
  },
  experience: {
    type: String,
    trim: true,
    
  },
  department: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  phone: {
    type: String,
    trim: true,
   
  },
  linkedin:{
    type: String,
    trim: true,
    
  },
  socialLinks: {
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    portfolio: {
      type: String,
      trim: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});



const Team= mongoose.models.Team || mongoose.model('Team', teamSchema);
export default Team 