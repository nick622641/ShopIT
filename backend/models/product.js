const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    serial: {
        type: String,
        unique: true,
        trim: true,
        maxLength: [100, 'Serial may not exceed 100 characters']
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
        maxLength: [5, 'Price may not exceed 5 digits'],
        default: 0.0
    },
    width: {
        type: Number,
        maxLength: [5, 'Width may not exceed 5 digits'],
        default: 0.0
    },
    height: {
        type: Number,
        maxLength: [5, 'Height may not exceed 5 digits'],
        default: 0.0
    },
    depth: {
        type: Number,        
        maxLength: [5, 'Depth may not exceed 5 digits'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter a description']       
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            thumb_id: {
                type: String,
                required: true
            },
            thumbUrl: {
                type: String,
                required: true
            }
        }
    ],
    categoryOne: {
        type: String,
        required: [true, 'Please select a category']
    },  
    categoryTwo: {
        type: String     
    },   
    categoryThree: {
        type: String        
    },     
    datePublished: {
        type: Date,
        default: Date.now
    },
    stock: {
        type: Number,
        required: [true, 'Please enter stock'],
        maxLength: [5, 'Stock may not exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            reviewCreatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    visible: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product