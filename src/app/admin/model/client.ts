import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    
    
  },
  address: {
    type: String,
    
    
  },
  phone: {
    type: String,
    
    
  },
  email: {
    type: String,
    
    
    lowercase: true
  },
  projectName: {
    type: String,
    
    
  },
  joiningDate: {
    type: Date,
    
    default: Date.now
  },
  numberOfProjects: {
    type: Number,
    
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);
export default Client;