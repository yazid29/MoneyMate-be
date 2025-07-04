const { successResponse, errorResponse } = require('../middleware/apiResponse');
const wallet = require('../models/walletModel');
const user = require('../models/authModel');
exports.getWallet = async (req, res) => {
    try {
        let result =await wallet.getAllData();
        successResponse(res,200,"Success Retrieve Data",result);
    } catch (error) {
        console.log(error);
        errorResponse(res,500,"Something went wrong",error.message);
    }
}
exports.getWalletbyUsername = async (req, res) => {
    try {
        let username = req.body.username;
        let resultUser = await user.getUserbyUsername(username);
        
        let result =await wallet.getDatabyUsername(resultUser.id);
        successResponse(res,200,"Success Retrieve Data",result);
    } catch (error) {
        console.log(error);
        errorResponse(res,500,"Something went wrong",error.message);
    }
}
exports.insertWallet = async (req, res) => {
    try {
        const body = req.body;
        try {
            const data = await wallet.insertData(body);
            if(data == 1) return successResponse(res, 200, 'Create Data Success');
        } catch (error) {
            return errorResponse(res, error.code? error.code:500, error.errmsg, error);
        }
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong",error.message);
    }
}