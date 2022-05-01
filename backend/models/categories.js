const mongoose = require('mongoose')

const categoryOneSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})
const CategoryOne = mongoose.model('CategoryOne', categoryOneSchema)

const categoryTwoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})
const CategoryTwo = mongoose.model('CategoryTwo', categoryTwoSchema)

const categoryThreeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
        trim: true,
        maxLength: [100, 'Name may not exceed 100 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})
const CategoryThree = mongoose.model('CategoryThree', categoryThreeSchema)

module.exports = { CategoryOne, CategoryTwo, CategoryThree }