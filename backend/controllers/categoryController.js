const { CategoryOne   }  = require('../models/categories'           )
const { CategoryTwo   }  = require('../models/categories'           )
const { CategoryThree }  = require('../models/categories'           )
const Product            = require('../models/product')
const ErrorHandler       = require('../utils/errorHandler'          )
const catchAsyncErrors   = require('../middlewares/catchAsyncErrors')

// Get all category ones => /api/v1/category1
exports.getCategoryOnes = catchAsyncErrors(async (req, res, next) => {
    const data = await CategoryOne.find().sort({ name: 1 })
    res.status(200).json({
        success: true,
        data
    })
})
// Get single category one => /api/v1/category1/:id
exports.getCategoryOne = catchAsyncErrors(async (req, res, next) => {    
    try {
        const data = await CategoryOne.findById(req.params.id)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        return next (new ErrorHandler('Category One not found', 404) )  
    }
})
// Create new category one => /api/v1/admin/category1/new
exports.newCategoryOne = catchAsyncErrors(async (req, res, next) => {    
    const data = await CategoryOne.create(req.body)
    res.status(201).json({
        success: true,
        data
    })
})
// Update category one => /api/v1/admin/category1/:id
exports.updateCategoryOne = catchAsyncErrors(async (req, res, next) => {
    try {    
            let data = await CategoryOne.findById(req.params.id)  
            data = await CategoryOne.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })   

        await Product.updateMany(
            {categoryOneSlug: req.body.oldSlug},
            {$set: { categoryOne: req.body.name, categoryOneSlug: req.body.slug }}
        )
      
        res.status(200).json({
            success: true,
            data
        })  
    } catch(error) {
        return next (new ErrorHandler('Category One not found', 404) )        
    }
})
// Delete category one => /api/v1/admin/category1/:id
exports.deleteCategoryOne = catchAsyncErrors(async (req, res, next) => {
    try {  
        const data = await CategoryOne.findById(req.params.id)    
        
        const products = await Product.find({ categoryOneSlug: data.slug })

        if(products.length > 0) {
            return next(new ErrorHandler('This category has products associated with it and cannot be deleted', 404)) 
        }        

        await data.remove()  
        res.status(200).json({
            success: true
        })
    } catch (error) {
        return next(new ErrorHandler('Category One not found', 404)) 
    }
})

// Get all category twos => /api/v1/category2
exports.getCategoryTwos = catchAsyncErrors(async (req, res, next) => {
    const data = await CategoryTwo.find().sort({ name: 1 })
    res.status(200).json({
        success: true,
        data
    })
})
// Get single category two => /api/v1/category2/:id
exports.getCategoryTwo = catchAsyncErrors(async (req, res, next) => {    
    try {
        const data = await CategoryTwo.findById(req.params.id)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        return next (new ErrorHandler('Category Two not found not found', 404) )  
    }
})
// Create new category two => /api/v1/admin/category2/new
exports.newCategoryTwo = catchAsyncErrors(async (req, res, next) => {    
    const data = await CategoryTwo.create(req.body)
    res.status(201).json({
        success: true,
        data
    })
})
// Update category two => /api/v1/admin/category2/:id
exports.updateCategoryTwo = catchAsyncErrors(async (req, res, next) => {
    try {    
            let data = await CategoryTwo.findById(req.params.id)  
            data = await CategoryTwo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        await Product.updateMany(
            {categoryTwoSlug: req.body.oldSlug},
            {$set: { categoryTwo: req.body.name, categoryTwoSlug: req.body.slug }}
        )

        res.status(200).json({
            success: true,
            data
        })  
    } catch(error) {
        return next(new ErrorHandler('Category Two not found', 404))        
    }
})
// Delete category two => /api/v1/admin/category2/:id
exports.deleteCategoryTwo = catchAsyncErrors(async (req, res, next) => {
    try {  
        const data = await CategoryTwo.findById(req.params.id)   
        
        const products = await Product.find({ categoryTwoSlug: data.slug })

        if(products.length > 0) {
            return next(new ErrorHandler('This category has products associated with it and cannot be deleted', 404)) 
        }        
        await data.remove()  
        res.status(200).json({
            success: true
        })
    } catch (error) {
        return next(new ErrorHandler('Category Two not found', 404)) 
    }
})

// Get all category threes => /api/v1/category3
exports.getCategoryThrees = catchAsyncErrors(async (req, res, next) => {
    const data = await CategoryThree.find().sort({ name: 1 })
    res.status(200).json({
        success: true,
        data
    })
})
// Get single category three => /api/v1/category3/:id
exports.getCategoryThree = catchAsyncErrors(async (req, res, next) => {    
    try {
        const data = await CategoryThree.findById(req.params.id)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        return next (new ErrorHandler('Category Three not found', 404) )  
    }
})
// Create new category three => /api/v1/admin/category3/new
exports.newCategoryThree = catchAsyncErrors(async (req, res, next) => {    
    const data = await CategoryThree.create(req.body)
    res.status(201).json({
        success: true,
        data
    })
})
// Update category three => /api/v1/admin/category3/:id
exports.updateCategoryThree = catchAsyncErrors(async (req, res, next) => {
    try {    
        let data = await CategoryThree.findById(req.params.id)  
        data = await CategoryThree.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        await Product.updateMany(
            {categoryThreeSlug: req.body.oldSlug},
            {$set: { categoryThree: req.body.name, categoryThreeSlug: req.body.slug }}
        )

        res.status(200).json({
            success: true,
            data
        })  
    } catch(error) {
        return next(new ErrorHandler('Category Three not found', 404))        
    }
})
// Delete category three => /api/v1/admin/category3/:id
exports.deleteCategoryThree = catchAsyncErrors(async (req, res, next) => {
    try {  
        const data = await CategoryThree.findById(req.params.id)   
        
        const products = await Product.find({ categoryThreeSlug: data.slug })

        if(products.length > 0) {
            return next(new ErrorHandler('This category has products associated with it and cannot be deleted', 404)) 
        }        

        await data.remove()  
        res.status(200).json({
            success: true
        })
    } catch (error) {
        return next(new ErrorHandler('Category Three not found', 404)) 
    }
})
