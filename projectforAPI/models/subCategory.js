const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [1, 'Too short name'],
        maxlength: [30, 'Too long name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: String,
        ref: 'Category',
        validate: {
            validator: async function (value) {
                const category = await mongoose.model('Category').findOne({ name: value });
                return !!category;
            },
            message: 'Category does not exist'
        },
        required: [true, 'Must belong to main category']
    }
}, { timestamps: true });

subCategorySchema.index({ name: 1, category: 1 }, { unique: true, message: 'Subcategory name already exists within the same category' });

module.exports = mongoose.model('SubCategory', subCategorySchema);