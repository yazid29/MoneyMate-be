const pool = require("../connection/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logger } = require("../middleware/logger");

class authModel {
    getAllData = async () => {
        try {
            const users = await pool('tb_user').select('*');
            return users;
        } catch (error) {
            console.log(error);
        }
    }
    getUserbyUsername = async (username) => {
        try {
            const userString = (await pool('tb_user').select('id','username').where({ username: username })).toString();
            console.log(userString);
            
            const user = await pool('tb_user').select('id','username').where({ username: username });
            
            return user[0];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authModel();