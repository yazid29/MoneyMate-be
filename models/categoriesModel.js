const pool = require("../connection/db");
const { logger } = require("../middleware/logger");

class categoriesModel {
    insertCategory = async (data) => {
        const [categoryId] = await pool('tb_categories').insert({
            user_id: data.userId,
            name: data.nameCategory,
            type: data.type,
            is_default: data.isDefault,
        }).returning('id');
        return categoryId;
    };

    getCategoriesForUser = async (userId) => {
        let query = pool('tb_categories')
            .where('is_default', true);

        if (userId) {
            query.orWhere('user_id', userId);
        }

        return query;
    };

    getCategoryById = async (categoryId) => {
        return pool('tb_categories').where({ id: categoryId, deleted_at: null }).first();
    };

    updateCategory = async (categoryId, data) => {
        return pool('tb_categories').where({ id: categoryId }).update({
            ...data,
            updated_at: new Date()
        });
    };

    softDeleteCategory = async (categoryId) => {
        return pool('tb_categories').where({ id: categoryId }).update({
            deleted_at: new Date()
            // updated_at: new Date()
        });
    };
}

module.exports = new categoriesModel();