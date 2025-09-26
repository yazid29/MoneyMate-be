const pool = require("../connection/db");
const { logger } = require("../middleware/logger");

class categoriesModel {
    insertCategory = async (data) => {
        if (!userId) {
            throw new Error('Category must be linked to a user');
        }
        
        const [categoryId] = await db('tb_categories').insert({
            user_id: data.userId,
            name: data.nameCategory,
            type: data.type,
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