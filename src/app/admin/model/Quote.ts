const mongoose = require('mongoose');

// Quote Request Schema
const quoteRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minLength: [2, 'Full name must be at least 2 characters long'],
    maxLength: [100, 'Full name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  
  countryCode: {
    type: String,
    required: [true, 'Country code is required'],
    enum: ['+1', '+44', '+91', '+86', '+49', '+33', '+81', '+61'],
    default: '+1'
  },
  
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    minLength: [7, 'Mobile number must be at least 7 digits'],
    maxLength: [15, 'Mobile number cannot exceed 15 digits'],
    match: [/^\d+$/, 'Mobile number must contain only digits']
  },
  
  
  
  budget: {
    type: String,
    
    enum: [
      'Under $5,000',
      '$5,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000 - $50,000',
      '$50,000 - $100,000',
      'Above $100,000'
    ]
  },
  
  projectInfo: {
    type: String,
    

  },
  
  
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  source: {
    type: String,
    default: 'website-form'
  },
  
  ipAddress: {
    type: String,
    default: null
  },
  
  userAgent: {
    type: String,
    default: null
  },
  
  // Admin notes
  adminNotes: {
    type: String,
    maxLength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});







const QuoteRequest =mongoose.models.QuoteRequest || mongoose.model('QuoteRequest', quoteRequestSchema);
export default QuoteRequest;
