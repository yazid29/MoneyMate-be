const pool = require("../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logger } = require("../middleware/logger");

class authModel {
    getAllData = async () => {
        try {
            const users = await pool('tb_house').select('*');
            console.log(users);
            return users;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authModel();