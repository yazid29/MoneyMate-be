const pool = require("../connection/db");
const { logger } = require("../middleware/logger");

class walletModel {
    createWallet = async (data) => {
        const [walletId] = await pool('tb_wallets').insert(data).returning('id');
        return walletId;
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

    deleteWallet = async (walletId) => {
        return pool('tb_wallets').where({ id: walletId }).del();
    };
    
}

module.exports = new walletModel();