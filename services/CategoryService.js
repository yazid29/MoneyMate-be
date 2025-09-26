const categoriesModel = require('../models/categoriesModel');
const accountModel = require('../models/authModel');

exports.insertCategory = async(data) => {
    const userName = data.username;
    const familyId = data.familyId;

    const existingUser = await accountModel.checkExistingUser(userName);
    if (!existingUser){
        throw new Error('Unauthorized: User is Found');
    }

    const dataInput = {
        userId : existingUser.Id,
        // family_id : data.familyId,
        nameCategory: data.nameCategory,
        type: data.type
    }

    return await categoriesModel.insertCategory(dataInput);
}

exports.getCategories = async (userId) => {
    const categories = await categoriesModel.getCategoriesForUser(userId);
    
    return categories;
};
exports.updateCategory = async (categoryId, data) => {
    const updateData = {
        name: data.name,
        type: data.type
    };
    return categoriesModel.updateCategory(categoryId, updateData);
};

exports.deleteCategory = async (categoryId) => {
    return categoriesModel.softDeleteCategory(categoryId);
};