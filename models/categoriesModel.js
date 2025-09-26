const pool = require("../connection/db");
const { logger } = require("../middleware/logger");

class categoriesModel {
    createCategory = async (data) => {
        let userId = data.userName;
        let nameCategory = data.category;
        let type = data.type;
        let isDefault = false;
        if (!userId) {
            throw new Error('Category must be linked to a user');
        }
        
        const [categoryId] = await db('tb_categories').insert({
            user_id: userId || null,
            name: nameCategory,
            type: type,
            is_default: isDefault,
        }).returning('id');
        return categoryId;
    };

    getCategoriesForUser = async (userId) => {
        return db('tb_categories').orWhere('user_id', userId)
    };

    getCategoryById = async (categoryId) => {
        return db('tb_categories').where({ id: categoryId, deleted_at: null }).first();
    };

    updateCategory = async (categoryId, data) => {
        return db('tb_categories').where({ id: categoryId }).update({
            ...data,
            updated_at: new Date()
        });
    };

    softDeleteCategory = async (categoryId) => {
        return db('tb_categories').where({ id: categoryId }).update({
            deleted_at: new Date(),
            updated_at: new Date()
        });
    };
}

module.exports = new categoriesModel();