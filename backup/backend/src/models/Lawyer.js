const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Professional title is required'],
        trim: true
    },
    specializations: [{
        type: String,
        enum: [
            'Hukum Pidana',
            'Hukum Perdata', 
            'Hukum Keluarga',
            'Hukum Ketenagakerjaan',
            'Hukum Bisnis',
            'Hukum Agraria',
            'Hukum Properti',
            'Hukum Konsumen'
        ],
        required: true
    }],
    licenseNumber: {
        type: String,
        required: [true, 'License number is required'],
        unique: true
    },
    experience: {
        years: {
            type: Number,
            required: [true, 'Years of experience is required'],
            min: [0, 'Experience cannot be negative']
        },
        description: {
            type: String,
            maxlength: [1000, 'Experience description cannot exceed 1000 characters']
        }
    },
    education: [{
        degree: {
            type: String,
            required: true
        },
        institution: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    }],
    languages: [{
        type: String,
        default: ['Indonesia']
    }],
    location: {
        city: {
            type: String,
            required: [true, 'City is required']
        },
        province: {
            type: String,
            required: [true, 'Province is required']
        },
        address: {
            type: String,
            maxlength: [200, 'Address cannot exceed 200 characters']
        }
    },
    consultationFee: {
        type: Number,
        default: 0,
        min: [0, 'Consultation fee cannot be negative']
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be negative'],
            max: [5, 'Rating cannot exceed 5']
        },
        count: {
            type: Number,
            default: 0
        }
    },
    successfulCases: {
        type: Number,
        default: 0,
        min: [0, 'Successful cases cannot be negative']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    workingHours: {
        start: {
            type: String,
            default: '09:00'
        },
        end: {
            type: String,
            default: '17:00'
        },
        timezone: {
            type: String,
            default: 'Asia/Jakarta'
        }
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    achievements: [{
        title: String,
        description: String,
        year: Number
    }]
}, {
    timestamps: true
});

// Indexes for better performance
lawyerSchema.index({ userId: 1 });
lawyerSchema.index({ specializations: 1 });
lawyerSchema.index({ 'location.city': 1 });
lawyerSchema.index({ 'rating.average': -1 });
lawyerSchema.index({ isVerified: 1, isAvailable: 1 });

// Virtual populate for user data
lawyerSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

// Ensure virtual fields are serialized
lawyerSchema.set('toJSON', { virtuals: true });
lawyerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);
