const categoriesModel = require('../models/categoriesModel');
const accountModel = require('../models/authModel');

exports.insertCategory = async(data) => {
    const defaultType = data.isDefault;
    console.log('isDefault',defaultType);
    
    const userName = data.username;
    const familyId = data.familyId;

    let userNameValue = null;
    if(!defaultType){
        const existingUser = await accountModel.checkExistingUser(userName);
        if (!existingUser){
            throw new Error('Unauthorized: User is Found');
        }
        userNameValue = existingUser.Id;
    }

    const dataInput = {
        userId : userNameValue,
        // family_id : data.familyId,
        nameCategory: data.nameCategory,
        isDefault:defaultType,
        type: data.type
    }

    return await categoriesModel.insertCategory(dataInput);
}

exports.getCategoriesByUsername = async (data) => {
    const userName = data.username;
    const existingUser = await accountModel.checkExistingUser(userName);
    let idUser = existingUser?.id;
    const categories = await categoriesModel.getCategoriesForUser(idUser);
    
    return categories;
};
exports.updateCategory = async (categoryId,data) => {
    let dataUpdate = {
        name : data.nameCategory,
        type : data.type,
        is_default:data.isDefault
    }

    const updatedCount = await categoriesModel.updateCategory(categoryId, dataUpdate);

    if (updatedCount === 0) {
        throw new Error(`Category with ID ${categoryId} could not be updated or was not found.`);
    }

    return updatedCount;
};

exports.deleteCategory = async (categoryId) => {
    return categoriesModel.softDeleteCategory(categoryId);
};