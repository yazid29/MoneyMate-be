const { successResponse, errorResponse } = require('../middleware/apiResponse');
const categoryService = require('../services/CategoryService');

exports.insert = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await categoryService.insertCategory(body);
        console.log('result >> ',result);
        if(result.status == 0){
            let errMsg = result.message;
            console.log('Error Message !!',errMsg);
            // return errorResponse(result,req,res, 400);
            throw errMsg;
        }
        return successResponse(res, 201, "Insert successful!");
    } catch (error) {
        console.log('Error Message !!',error);
        next(error);
    }
}
exports.getCategories = async (req, res, next) => {
    try {
        const body = req.body;
        let result =await categoryService.getCategoriesByUsername(body);
        // console.log('result',result);

        successResponse(res,200,"Success Updated Data",result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.updateCategories = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const body = req.body;
        if (!categoryId) {
            const error = new Error('Category ID is missing in the URL path.');
            error.statusCode = 400; // Bad Request
            return next(error); 
        }

        if (Object.keys(body).length === 0) {
            const error = new Error('Request body cannot be empty for updating a category.');
            error.statusCode = 400; // Bad Request
            return next(error);
        }

        let result =await categoryService.updateCategory(categoryId,body);
        // let result ='Success';
        successResponse(res,200,"Success Retrieve Data",result);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteCategoryController = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            let errMsg = 'Category ID is required';
            throw errMsg;
        }
        const deleteResult = await categoryService.deleteCategory(categoryId);
        if (deleteResult > 0) {
            successResponse(res,200,"Category has been successfully deleted",deleteResult);
        } else {
            let message= {
                statusCode: 404,
                message: `Category with ID ${categoryId} not found or already deleted.`
            }
            errorResponse(message,req,res);
        }
    }catch(error){
        console.log('Error Message !!',error);
        next(error);
    }
}