const { successResponse, errorResponse } = require('../middleware/apiResponse');
const walletService = require('../services/WalletService');
exports.insertWallet = async (req, res) => {
    try {
        const body = req.body;
        const result = await walletService.insertWallet(body);
        console.log('result >> ',result);
        if(result.status == 0){
            let errMsg = result.message;
            console.log('Error Message !!',errMsg);
            return errorResponse(result,req,res, 400);
        }
        return successResponse(res, 201, "Insert successful!");
    } catch (error) {
        console.log('Error Message !!',error);
        return errorResponse(error,req,res);
    }
}
exports.getWallet = async (req, res) => {
    try {
        let result =await wallet.getAllData();
        successResponse(res,200,"Success Retrieve Data",result);
    } catch (error) {
        console.log(error);
        errorResponse(res,500,"Something went wrong",error.message);
    }
}
exports.deleteWallet = async (req, res, next) => {
    try {
        const walletId = req.params.id;
        if (!walletId) {
            let errMsg = 'Wallet ID is required';
            throw errMsg;
        }
        const deleteResult = await walletService.deleteWallet(walletId);
        if (deleteResult > 0) {
            successResponse(res,200,"Wallet has been successfully deleted",deleteResult);
        } else {
            let message= {
                statusCode: 404,
                message: `Wallet with ID ${walletId} not found or already deleted.`
            }
            errorResponse(message,req,res);
        }
    }catch(error){
        console.log('Error Message !!',error);
        next(error);
    }
}