const pool = require("../connection/db");
const { logger } = require("../middleware/logger");

class walletModel {
    createWallet = async (data) => {
        const [categoryId] = await pool('tb_wallets').insert({
            user_id: data.userId,
            name: data.nameWallet,
            owner_type: data.ownerType,
            balance: data.balance,
            type: data.typeWallet,
        }).returning('id');
        return categoryId;
    };

    getWalletById = async (walletId) => {
        return pool('tb_wallets').where({ id: walletId, deleted_at: null }).first();
    };

    getWalletsByUserId = async (userId) => {
        return pool('tb_wallets as t1')
            .select('t1.*')
            .where('t1.user_id', userId)
            .whereNull('t1.deleted_at')
            .groupBy('t1.id')
            .orderBy('t1.created_at', 'asc');
    };

    updateWallet = async (walletId, data) => {
        return pool('tb_wallets').where({ id: walletId }).update({
            ...data,
            updated_at: new Date()
        });
    };

    softDelete = async (walletId) => {
        return pool('tb_wallets').where({ id: walletId }).update({
            deleted_at: new Date()
        });
    };
}

module.exports = new walletModel();