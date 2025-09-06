const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Category description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    icon: {
        type: String,
        required: [true, 'Category icon is required']
    },
    color: {
        type: String,
        required: [true, 'Category color is required'],
        match: [/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color']
    },
    caseCount: {
        type: Number,
        default: 0,
        min: [0, 'Case count cannot be negative']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create slug from name before saving
categorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
    }
    next();
});

// Index for better performance
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1, sortOrder: 1 });

module.exports = mongoose.model('Category', categorySchema);
