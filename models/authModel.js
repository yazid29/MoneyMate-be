const pool = require("../connection/db");
class authModel {
    checkExistingUser = async (username) => {
        try {
            const user = await pool('tb_users')
                .where({ username: username })
                .first();
            return user;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = new authModel();