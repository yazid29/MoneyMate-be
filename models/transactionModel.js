const pool = require("../connection/db");

class transactionModel {
    createTransaction = async (data) => {
        const [transactionId] = await db('tb_transactions').insert(data).returning('id');
        return transactionId;
    };

    getTransactionsByCriteria = async (userId, walletId, filters = {}) => {
        let query = db('tb_transactions')
            .where('user_id', userId)
            .whereNull('deleted_at')
            .orderBy('transaction_date', 'desc');

        if (walletId) {
            query = query.where(function() {
                this.where('wallet_id', walletId).orWhere('target_wallet_id', walletId);
            });
        }

        if (filters.type) {
            query = query.where('type', filters.type);
        }

        if (filters.startDate && filters.endDate) {
            query = query.whereBetween('transaction_date', [filters.startDate, filters.endDate]);
        }
        
        if (filters.categoryId) {
            query = query.where('category_id', filters.categoryId);
        }

        return query.select('*');
    };

    getTransactionById = async (transactionId) => {
        return db('tb_transactions').where({ id: transactionId, deleted_at: null }).first();
    };

    updateTransaction = async (transactionId, data) => {
        return db('tb_transactions').where({ id: transactionId }).update({
            ...data,
            updated_at: new Date()
        });
    };

    deleteTransaction = async (transactionId) => {
        return db('tb_transactions').where({ id: transactionId }).del();
    };
}

module.exports = new transactionModel();